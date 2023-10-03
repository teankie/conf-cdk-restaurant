import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import {Certificate} from "aws-cdk-lib/aws-certificatemanager";
import {ConfCdkRestaurantFrontendStack} from "../lib/conf-cdk-restaurant-frontend-stack";

test('S3 Bucket Created', () => {
    const app = new App();
    const stack = new ConfCdkRestaurantFrontendStack(app, 'TestStack', {
        confCdkRestaurantDistributionCertificate: { certificateArn: 'arn:aws:fake:us-east-1:123456789012:example-fakename' } as Certificate,
        env: { region: 'eu-west-1', account: '531843824238' }
    }, 'subdomain');

    const template = Template.fromStack(stack);

    template.hasResource('AWS::S3::Bucket', {});
});

test('CloudFront Distribution Created', () => {
    const app = new App();
    const stack = new ConfCdkRestaurantFrontendStack(app, 'TestStack', {
        confCdkRestaurantDistributionCertificate: { certificateArn: 'arn:aws:fake:us-east-1:123456789012:example-fakename' } as Certificate,
        env: { region: 'eu-west-1', account: '531843824238' }
    }, 'subdomain');

    const template = Template.fromStack(stack);

    template.hasResource('AWS::CloudFront::Distribution', {});
});

test('Route53 A Record Created for CloudFront Distribution', () => {
    const app = new App();
    const stack = new ConfCdkRestaurantFrontendStack(app, 'TestStack', {
        confCdkRestaurantDistributionCertificate: { certificateArn: 'arn:aws:fake:us-east-1:123456789012:example-fakename' } as Certificate,
        env: { region: 'eu-west-1', account: '531843824238' }
    }, 'subdomain');

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Route53::RecordSet', {
        Type: 'A',
    });
});