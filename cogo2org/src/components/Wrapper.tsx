'use client';
import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { CookieStorage } from 'aws-amplify/utils';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: "7o80p52ougf2luiib4rqfrp1b3",      //70ae5mssem1trf4k8tlo6ta546
      userPoolId: "us-east-1_r2nt00A0L",      //us-east-1_DZqDrYBui
      loginWith: {
        oauth: {
          redirectSignIn: [
            "http://localhost:3000/",
          ],
          redirectSignOut: [
            "http://localhost:3000/",
          ],
          responseType: "code",
          // "aws.cognito.signin.user.admin"
          scopes: ["profile", "email", "openid", "phone", "aws.cognito.signin.user.admin"],
          providers: ["Google"],
          domain: "landers-demo.auth.us-east-1.amazoncognito.com"
        },
      },
    },
  },
}, {
  ssr: true // required when using Amplify with Next.js
});

export default function RootLayoutThatConfiguresAmplifyOnTheClient({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage);
