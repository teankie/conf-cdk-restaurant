import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import {ConfCdkRestaurantFrontendStack} from "./conf-cdk-restaurant-frontend-stack";
import {ConfCdkRestaurantGlobalStack} from "./conf-cdk-restaurant.global-stack";

export class ConfCdkPipeline extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, 'ConfCdkPipeline', {
            pipelineName: 'ConfCdkPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub('vroegop/conf-cdk-restaurant', 'main'),
                commands: ['npm ci', 'npm run build', 'npx cdk synth']
            })
        });

        pipeline.addStage(new ConfCdkPipelineStage(this, "deployConfCdkStacks", {
            env: { region: 'eu-west-1', account: '531843824238' },
        }));
    }
}

export class ConfCdkPipelineStage extends cdk.Stage {

    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
        super(scope, id, props);

        const confCdkRestaurantGlobalStack = new ConfCdkRestaurantGlobalStack(this, 'confCdkRestaurantGlobalStack', {
            env: { region: 'us-east-1', account: '531843824238' },
        });

        const confCdkRestaurantFrontendStack = new ConfCdkRestaurantFrontendStack(this, 'confCdkRestaurantFrontendStack', {
            env: { region: 'eu-west-1', account: '531843824238' },
            confCdkRestaurantDistributionCertificate: confCdkRestaurantGlobalStack.confCdkRestaurantDistributionCertificate,
            crossRegionReferences: true,
        });
    }
}