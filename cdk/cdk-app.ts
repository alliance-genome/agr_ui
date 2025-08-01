#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AmplifyALBStack } from './amplify-alb-stack';
import { AmplifyStageStack } from './amplify-stage-stack';
import { AmplifyTestStack } from './amplify-test-stack';
import { AmplifyProductionStack } from './amplify-production-stack';

const app = new cdk.App();

new AmplifyALBStack(app, 'test-alb-stack', {
  stackName: 'test-alb-stack',
  dnsName: 'test',
  targetInstanceId: 'i-0ebadbf0e1a9240ba',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});

new AmplifyALBStack(app, 'prod-alb-stack', {
  stackName: 'prod-alb-stack',
  dnsName: 'prod',
  targetInstanceId: 'i-0ebadbf0e1a9240ba',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});

new AmplifyStageStack(app, 'agr-ui-stage', {
  stackName: 'agr-ui-stage',
});
new AmplifyTestStack(app, 'agr-ui-test', {
  stackName: 'agr-ui-test',
});
new AmplifyProductionStack(app, 'agr-ui-production', {
  stackName: 'agr-ui-production',
});
