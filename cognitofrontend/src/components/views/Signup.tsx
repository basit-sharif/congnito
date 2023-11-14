"use client"
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from '@/lib/aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

export default function Signin() {

  return (
    <Authenticator.Provider>
      <Authenticator >
        {({ signOut, user }) => {
          console.log("user", user);
          return (
            <main>
              <h1>Hello {user ? user.username : "NOT"}</h1>
              <button onClick={signOut}>Sign out</button>
            </main>
          )
        }}
      </Authenticator>
    </Authenticator.Provider>
  );
}