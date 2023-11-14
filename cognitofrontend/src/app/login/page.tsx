import Signin from '@/components/views/Signup'
import awsExports from '@/lib/aws-exports';
import { Amplify } from 'aws-amplify'
import React from 'react'
// import { runWithAmplifyServerContext } from '@aws-amplify/adapter-nextjs';

Amplify.configure({ ...awsExports, ssr: true });

const Login = async () => {
    return (
        <div>
            <Signin />
        </div>
    )
}

export default Login