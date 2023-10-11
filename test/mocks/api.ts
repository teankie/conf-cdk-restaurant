import {mockLambda} from "./lambda";
import {LambdaRestApi} from "aws-cdk-lib/aws-apigateway";
import {Construct} from "constructs";

export const mockApi = (scope: Construct) => new LambdaRestApi(scope, 'MockApi', {
    handler: mockLambda(scope, 'mockApiLambda'),
});