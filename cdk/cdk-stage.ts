#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {StageALBStack} from './stage-alb-stack';

const app = new cdk.App();

new StageALBStack(app, 'stage-alb-stack', {
  stackName: 'stage-alb-stack',
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
