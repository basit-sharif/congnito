import { fetchAuthSession } from 'aws-amplify/auth/server';
import { NextRequest, NextResponse } from 'next/server';
import { runWithAmplifyServerContext } from '@/utils/amplifyServerUtils';
import { Amplify } from 'aws-amplify';

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

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec: any) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  });
  console.log("authenticated", authenticated);
  if (authenticated) {
    return response;
  }
  NextResponse.redirect(`http://localhost:3000/login`);
  // return NextResponse.redirect(new URL('/login', request.url));

  return NextResponse.next();

}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sign-in).*)'
  ]
};