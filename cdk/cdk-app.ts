#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AmplifyStageStack } from './amplify-stage-stack';
import { AmplifyTestStack } from './amplify-test-stack';
import { AmplifyProductionStack } from './amplify-production-stack';

const app = new cdk.App();

new AmplifyStageStack(app, 'agr-ui-stage', {
  stackName: 'agr-ui-stage',
});
new AmplifyTestStack(app, 'agr-ui-test', {
  stackName: 'agr-ui-test',
});
new AmplifyProductionStack(app, 'agr-ui-production', {
  stackName: 'agr-ui-production',
});
