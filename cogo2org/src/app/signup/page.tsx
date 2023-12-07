"use client"
import { useEffect, useState } from 'react';
import { signUp, confirmSignUp, type ConfirmSignUpInput, resendSignUpCode, updateUserAttributes } from 'aws-amplify/auth';

type SignUpParameters = {
    password: string;
    email: string;
};

async function handleSignUp({
    password,
    email,
}: SignUpParameters) {
    try {
        const { isSignUpComplete, userId, nextStep } = await signUp({
            username: email,
            password,
            options: {
                userAttributes: {
                    email,
                },
            }
        });

        console.log("isSignUpComplete: ", isSignUpComplete, "userId : ", userId, "nextStep : ", nextStep);
    } catch (error) {
        console.log('error signing up:', error);
    }
};

async function handleSignUpConfirmation({
    username,
    confirmationCode
}: ConfirmSignUpInput) {
    try {
        const { isSignUpComplete, nextStep } = await confirmSignUp({
            username,
            confirmationCode
        });
        console.log("isSignUpComplete: ", isSignUpComplete, "nextstep : ", nextStep)
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

const handleResendVerification = async (email: string) => {
    try {
        await resendSignUpCode({ username: email });
        console.log('Verification code resent');
    } catch (error) {
        console.log('error resending verification code:', error);
    }
};

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [step, setStep] = useState(1); // To manage steps: 1 - Signup, 2 - Verification, 3 - Profile information
    const [fullName, setFullName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const handleSignup = async (e: any) => {
        e.preventDefault();
        await handleSignUp({ email, password });
        setStep(2);
    };

    const handleVerification = async (e: any) => {
        e.preventDefault();
        await handleSignUpConfirmation({ username: email, confirmationCode: verificationCode });
        setStep(1); // Go back to the signup step
    };
    

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
            {step === 1 && (
                <form onSubmit={handleSignup}>
                    <label className="block mb-4">
                        <span className="text-gray-700">Email:</span>
                        <input
                            type="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">Password:</span>
                        <input
                            type="password"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                    >
                        Signup
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleVerification}>
                    <label className="block mb-4">
                        <span className="text-gray-700">Verification Code:</span>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                    >
                        Verify
                    </button>
                    <button onClick={() => handleResendVerification(email)}>Resend Code</button>
                </form>
            )}
        </div>
    );
};

export default Signup;
