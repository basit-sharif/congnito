"use client"
import { useState } from 'react';
import { signIn, type SignInInput } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { CookieStorage } from 'aws-amplify/utils';
import awsExports from '@/utils/config';

Amplify.configure(awsExports)

export async function handleSignIn({ username, password }: SignInInput) {
    try {
        const { isSignedIn, nextStep } = await signIn({ username, password });
        console.log("isSignedIn: ", isSignedIn, "nextStep : ", nextStep);
        return {
            isSignedIn,
            nextStep
        }
    } catch (error) {
        console.log('error signing in', (error as { message: string }).message);
        return (error as { message: string }).message
    }
}
cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage);


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = await handleSignIn({ username: email, password: password });
        console.log("data : ", data);
        setEmail('');
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                Sign In
            </button>
        </form>
    );
};

export default Login;
