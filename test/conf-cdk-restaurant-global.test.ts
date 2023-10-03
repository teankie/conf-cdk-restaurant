import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import {ConfCdkRestaurantGlobalStack} from "../lib/conf-cdk-restaurant.global-stack";

test('Certificate Created for cloud101.nl', () => {
    const app = new App();
    const stack = new ConfCdkRestaurantGlobalStack(app, 'TestStack', {
        env: { region: 'us-east-1', account: '531843824238' }
    }, 'subdomain');

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::CertificateManager::Certificate', {
        DomainName: 'subdomain.cloud101.nl',
    });
});