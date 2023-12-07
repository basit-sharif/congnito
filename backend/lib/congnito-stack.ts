import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito'
import * as lambda from 'aws-cdk-lib/aws-lambda'
// import * as sqs from 'aws-cdk-lib/aws-sqs';


// const customAttributeConfig: cognito.CustomAttributeConfig = {
//   dataType: 'String',
//   mutable: false,
// };

export class CongnitoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = new cognito.UserPool(this, 'userpoolforsignupin', {
      userPoolName: "mynewapp_userpool",
      selfSignUpEnabled: true,
      autoVerify: { email: true },
      signInAliases: { email: true },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        tempPasswordValidity: cdk.Duration.days(3),
      },
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true
        },
        phoneNumber: {
          required: false,
          mutable: true
        },
        givenName: {
          required: false,
          mutable: true
        },
        gender: {
          required: false,
          mutable: true
        },
        profilePicture: {
          required: false,
          mutable: true
        },
        address: {
          required: false,
          mutable: true
        }
      },
      customAttributes: {
        'role': new cognito.StringAttribute({ minLen: 3, maxLen: 20, mutable: true }),
        'discription': new cognito.StringAttribute({ minLen: 10, maxLen: 100, mutable: true }),
      },
    });

    const googleProvider = new cognito.UserPoolIdentityProviderGoogle(this, "Google_Provider", {
      clientId: "",
      clientSecret: "",     // Deprecated: use clientSecretValue instead https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cognito.UserPoolIdentityProviderGoogleProps.html#example
      userPool: userPool,
      attributeMapping: {
        email: cognito.ProviderAttribute.GOOGLE_EMAIL,
        givenName: cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
        gender: cognito.ProviderAttribute.GOOGLE_GENDER,
        phoneNumber: cognito.ProviderAttribute.GOOGLE_PHONE_NUMBERS,
        profilePicture: cognito.ProviderAttribute.GOOGLE_PICTURE,
      },
      scopes: ["profile", "email", "openid"],
    })

    userPool.registerIdentityProvider(googleProvider);

    const userPoolClient = new cognito.UserPoolClient(this, "userpoolclient_amplify", {
      userPool,
      oAuth: {
        callbackUrls: ["http://localhost:3000/"]
      }
    });

    const domain = userPool.addDomain("domain", {
      cognitoDomain: {
        domainPrefix: "landers-demo"
      }
    });


    new cdk.CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId
    });

    new cdk.CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId
    });

    new cdk.CfnOutput(this, "domain", {
      value: domain.domainName
    });

  }
}
