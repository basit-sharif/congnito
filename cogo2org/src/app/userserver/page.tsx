import { cookies } from 'next/headers';
import { getCurrentUser } from '@aws-amplify/auth/server';
import { runWithAmplifyServerContext } from '@/utils/amplifyServerUtils';

// This page always dynamically renders per request
export const dynamic = 'force-dynamic';

export default async function AuthGetCurrentUserServer() {
    try {
        
        const currentUser = await runWithAmplifyServerContext({
            nextServerContext: { cookies },
            operation: (contextSpec) => getCurrentUser(contextSpec)
        });
        console.log("currentUser : " , currentUser)

        return (
            <div>Email: {currentUser.signInDetails?.loginId}</div>
        );
    } catch (error) {
        console.error(error);
        return <p>Something went wrong...</p>;
    }
}