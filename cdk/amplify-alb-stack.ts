import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as targets from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';
import * as cdk from 'aws-cdk-lib';

export interface MultistackProps extends cdk.StackProps {
  dnsName: string,
  targetInstanceId: string
}

export class AmplifyALBStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: MultistackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'Docker', { vpcName: 'Docker' });
    const sg1 = ec2.SecurityGroup.fromLookupById(this, 'default', 'sg-21ac675b');
    const sg2 = ec2.SecurityGroup.fromLookupById(this, 'HTTP/HTTPS', 'sg-0415cab61ab6b45c5');
    const cert = elbv2.ListenerCertificate.fromArn('arn:aws:acm:us-east-1:100225593120:certificate/047a56a2-09dd-4857-9f28-32d23650d4da');
    const targetInstance = new targets.InstanceIdTarget(props.targetInstanceId)
    const public_zone = route53.HostedZone.fromHostedZoneAttributes(this, 'Public Zone', { zoneName: 'alliancegenome.org', hostedZoneId: 'Z3IZ3D6V94JEC2' });
    const private_zone = route53.HostedZone.fromHostedZoneAttributes(this, 'Private Zone', { zoneName: 'alliancegenome.org', hostedZoneId: 'Z007692222A6W93AZVSPD' });

    const alb = new elbv2.ApplicationLoadBalancer(this, 'alb', {
      vpc,
      internetFacing: true,
      securityGroup: sg1
    });

    alb.addSecurityGroup(sg2);

    new route53.CnameRecord(this, "Public DNS", {
      zone: public_zone,
      recordName: props.dnsName + '-alb',
      domainName: alb.loadBalancerDnsName,
      ttl: cdk.Duration.minutes(5)
    });
    new route53.CnameRecord(this, "Private DNS", {
      zone: private_zone,
      recordName: props.dnsName + '-alb',
      domainName: alb.loadBalancerDnsName,
      ttl: cdk.Duration.minutes(5)
    });

    const listener_https = alb.addListener('HTTPS Listener', {
      port: 443,
      open: true,
      certificates: [cert]
    });

    listener_https.addTargets("Backend Server", {
      healthCheck: {
        path: '/robots.txt',
        unhealthyThresholdCount: 3,
        healthyThresholdCount: 5,
        interval: cdk.Duration.seconds(60),
      },
      port: 80,
      targets: [targetInstance],
    });

/*
    listener_https.addAction("Redirect to Server", {
      priority: 10,
      conditions: [
        elbv2.ListenerCondition.hostHeaders([props.dnsName + '-alb.alliancegenome.org']),
      ],
      action: elbv2.ListenerAction.redirect({
        protocol: 'HTTPS',
        port: '443',
        host: '#{host}',
        path: '/#{path}',
        query: '#{query}',
        permanent: true,
      }),
    });
*/

    const listener_http = alb.addListener('HTTP Listener', {
      port: 80,
      open: true,
      defaultAction: elbv2.ListenerAction.redirect({
        protocol: 'HTTPS',
        port: '443',
        host: '#{host}',
        path: '/#{path}',
        query: '#{query}',
        permanent: true,
      }),
    });

    new cdk.CfnOutput(this, 'albDNS', {
      value: alb.loadBalancerDnsName
    });
  }
}
