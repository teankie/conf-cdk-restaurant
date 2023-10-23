import {RemovalPolicy, Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {AuthorizationType, Cors, EndpointType, LambdaRestApi} from "aws-cdk-lib/aws-apigateway";
import {Code, Function, Runtime} from "aws-cdk-lib/aws-lambda";
import {AttributeType, BillingMode, StreamViewType, Table} from "aws-cdk-lib/aws-dynamodb";
import {Certificate, CertificateValidation} from "aws-cdk-lib/aws-certificatemanager";
import {HostedZone} from "aws-cdk-lib/aws-route53";

// Todo: implement all needed constructs for the event api
export class ConfCdkRestaurantEventApiStack extends Stack {
    // This property is public because we need to point our Distribution to it (in the frontend-stack)
    public eventLambdaApi: LambdaRestApi;

    private eventDatabase: Table;
    private eventLambda: Function;
    private apiCertificate: Certificate;

    constructor(scope: Construct, id: string, props: StackProps, subdomain: string) {
        super(scope, id, props);

        const hostedZone = HostedZone.fromLookup(this, 'cloud101FrontendHostedZone', {
            domainName: 'cloud101.nl'
        });

        // this.eventDatabase = new Table(this, subdomain + 'EventDatabase', {

        // this.eventLambda = new Function(this, subdomain + 'EventLambda', {
            // The lambda code is available in `src/lambda/eventLambda`
            // Pass the following environment variable to the lambda:
            // environment: { EVENT_SOURCE_TABLE_NAME: this.eventDatabase.tableName }

        // Grant the lambda read/write access to the database

        // this.apiCertificate = new Certificate(this, subdomain + 'EventCertificate', {

        // this.eventLambdaApi = new LambdaRestApi(this, subdomain + 'EventLambdaApi', {
            // Make sure this API is functioning as a proxy to the lambda
            // Make sure this API has CORS enabled to allow localhost access if you want to test it locally


        // These will throw nullpointer exceptions until you implemented everything.
        this.eventLambdaApi.applyRemovalPolicy(RemovalPolicy.DESTROY);
        this.eventDatabase.applyRemovalPolicy(RemovalPolicy.DESTROY);
        this.eventLambda.applyRemovalPolicy(RemovalPolicy.DESTROY);
        this.apiCertificate.applyRemovalPolicy(RemovalPolicy.DESTROY);
    }
}
