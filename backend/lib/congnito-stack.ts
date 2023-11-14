import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito'
import * as lambda from 'aws-cdk-lib/aws-lambda'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CongnitoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, 'userpoolforsignupin', {
      userPoolName: "mynewapp_userpool",
      selfSignUpEnabled: true,
      autoVerify: { email: true },
      signInAliases: { email: true },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true
        },
      }
    });

    const userPoolClient = new cognito.UserPoolClient(this, "userpoolclient_amplify", {
      userPool
    });

    new cdk.CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId
    });

    new cdk.CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId
    });

  }
}
