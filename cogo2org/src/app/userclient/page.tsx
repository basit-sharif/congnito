"use client"
import awsExports from '@/utils/config';
import { Amplify } from 'aws-amplify';
import { getCurrentUser } from 'aws-amplify/auth';

Amplify.configure(awsExports, {
    ssr: true // required when using Amplify with Next.js
  });


async function currentAuthenticatedUser() {
    try {
        const user = await getCurrentUser();
        return user
    } catch (err) {
        console.log("err: " , err);
    }
}

import React from 'react'

const Userclie = async () => {
    const user = await currentAuthenticatedUser();
    console.log("user: ", user)

    return (
        <div>Userclie</div>
    )
}

export default Userclie