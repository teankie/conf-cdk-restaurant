import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {LambdaRestApi} from "aws-cdk-lib/aws-apigateway";
import {Function} from 'aws-cdk-lib/aws-lambda';
import {mockApi} from "./api";
import {mockLambda} from "./lambda";
import {mockEnv} from "./env";
import {Certificate} from "aws-cdk-lib/aws-certificatemanager";
import {mockCertificate} from "./certificate";

export class MockStack extends Stack {
    public mockApi: LambdaRestApi;
    public mockLambda: Function;
    public mockCertificate: Certificate;

    constructor(scope: Construct, id: string = 'MockStack', props: StackProps = {env: mockEnv}) {
        super(scope, id, props);

        this.mockApi = mockApi(this);
        this.mockLambda = mockLambda(this);
        this.mockCertificate = mockCertificate(this);
    }
}
