import { Auth } from 'aws-amplify';
import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

interface cookiesType {
    name: string,
    value: string,
}

async function getUserData(cookies: Array<cookiesType>) {
    if (cookies.length === 0) {
        return false
    }

    const CognitoCookies = cookies.filter((item: cookiesType) => item.name.includes("CognitoIdentityServiceProvider"))
    const CognitoCookiesAccessToken = cookies.filter((item: cookiesType) => item.name.includes(".accessToken"));
    const CognitoCookiesWithIdToken = cookies.filter((item: cookiesType) => item.name.includes(".idToken"));

    if (CognitoCookiesAccessToken.length == 0 || CognitoCookiesWithIdToken.length == 0) return false

    const decoded: any = jwt.decode(CognitoCookiesWithIdToken[0].value);

    return decoded
}


export async function middleware(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;
    const headersToken = request.cookies;
    const user = await getUserData(headersToken.getAll());

    if (pathname === "/login" || pathname === "/register") {
        if (user) return NextResponse.redirect(`${origin}`);
        return NextResponse.next();
    }
    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
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
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};


