#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AmplifyALBStack } from './amplify-alb-stack';

const app = new cdk.App();

new AmplifyALBStack(app, 'stage-alb-stack', {
  stackName: 'stage-alb-stack',
  dnsName: 'stage',
  targetInstanceId: 'i-0d7ea7b7cc11a2e8f',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});

new AmplifyALBStack(app, 'test-alb-stack', {
  stackName: 'test-alb-stack',
  dnsName: 'test',
  targetInstanceId: 'i-0b3c6166858f87457',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});

new AmplifyALBStack(app, 'prod-alb-stack', {
  stackName: 'prod-alb-stack',
  dnsName: 'prod',
  targetInstanceId: 'i-0b3eb7fefadda7616',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
