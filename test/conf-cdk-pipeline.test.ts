import {App} from "aws-cdk-lib";
import {Template} from "aws-cdk-lib/assertions";
import {ConfCdkPipeline} from "../lib/conf-cdk-pipeline-stack";


test('Pipeline is created', () => {
    const app = new App();
    const stack = new ConfCdkPipeline(app, 'TestStack', {
        env: { region: 'eu-west-1', account: '531843824238' }
    });

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CodePipeline::Pipeline', {});
});