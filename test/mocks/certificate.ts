import {Certificate} from "aws-cdk-lib/aws-certificatemanager";
import {Construct} from "constructs";

export const mockCertificate = (scope: Construct, id: string = 'MockCertificate') => new Certificate(scope, id, {
    domainName: 'mock.cloud101.nl',
    certificateName: 'mock.cloud101-certificate',
});