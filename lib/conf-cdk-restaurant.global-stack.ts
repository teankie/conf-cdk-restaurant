import { Construct } from 'constructs';
import {HostedZone} from "aws-cdk-lib/aws-route53";
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import {Stack, StackProps} from "aws-cdk-lib";

export class ConfCdkRestaurantGlobalStack extends Stack {
  public confCdkRestaurantDistributionCertificate: Certificate;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const hostedZone = HostedZone.fromLookup(this, 'cloud101HostedZone', {
      domainName: 'cloud101.nl'
    });

    this.confCdkRestaurantDistributionCertificate = new Certificate(this, 'restaurant.cloud101-certificate', {
      domainName: 'restaurant.cloud101.nl',
      certificateName: 'restaurant.cloud101-certificate',
      validation: CertificateValidation.fromDns(hostedZone),
    });
  }
}
