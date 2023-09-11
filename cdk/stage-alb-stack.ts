import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as targets from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';
import * as cdk from 'aws-cdk-lib';

export class StageALBStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'Docker', { vpcName: 'Docker' });
    const sg = ec2.SecurityGroup.fromLookupById(this, 'default', 'sg-21ac675b');
    const cert = elbv2.ListenerCertificate.fromArn('arn:aws:acm:us-east-1:100225593120:certificate/047a56a2-09dd-4857-9f28-32d23650d4da');
    const stage = new targets.InstanceIdTarget('i-0d7ea7b7cc11a2e8f')
    const public_zone = route53.HostedZone.fromHostedZoneAttributes(this, 'Public Zone', { zoneName: 'alliancegenome.org', hostedZoneId: 'Z3IZ3D6V94JEC2' });
    const private_zone = route53.HostedZone.fromHostedZoneAttributes(this, 'Private Zone', { zoneName: 'alliancegenome.org', hostedZoneId: 'Z007692222A6W93AZVSPD' });

    const alb = new elbv2.ApplicationLoadBalancer(this, 'alb', {
      vpc,
      internetFacing: false,
      securityGroup: sg
    });

    new route53.CnameRecord(this, "Public DNS", {
      zone: public_zone,
      recordName: "stage-alb",
      domainName: alb.loadBalancerDnsName,
      ttl: cdk.Duration.minutes(5)
    });
    new route53.CnameRecord(this, "Private DNS", {
      zone: private_zone,
      recordName: "stage-alb",
      domainName: alb.loadBalancerDnsName,
      ttl: cdk.Duration.minutes(5)
    });

    const listener = alb.addListener('HTTPS Listener', {
      port: 443,
      open: true,
      certificates: [cert]
    });

    listener.addTargets("Backend Stage", {
      port: 443,
      targets: [stage]
    });

    new cdk.CfnOutput(this, 'albDNS', {
      value: alb.loadBalancerDnsName
    });
  }
}
