"use client"
import React, { useEffect, useState } from "react";
import { Hub } from "aws-amplify/utils";
import { signInWithRedirect, signOut, getCurrentUser, fetchAuthSession } from "aws-amplify/auth";
import { AuthUser } from "aws-amplify/auth";

const getCurrentSession = async () => {
  try {
    const session: any = await fetchAuthSession();
    const sessionData = session.tokens;

    if (sessionData) {
      const { idToken: { payload } } = sessionData;

      console.log("sessionData", payload);
      //"custom:role": role if custom attribute is added
      const { email, sub, email_verified, "custom:role": role } = payload;
      const user: any = {
        userId: sub,
        email: email,
        email_verified: email_verified,
        role: role,
      };
      console.log("userssss : ", user);
    }
  } catch (e) {
    console.log(e)
  }
};
export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<unknown>(null);
  const [customState, setCustomState] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      switch (payload.event) {
        case "signInWithRedirect":
          getUser();
          break;
        case "signInWithRedirect_failure":
          setError("An error has ocurred during the Oauth flow.");
          break;
        case "customOAuthState":
          setCustomState(payload.data);
          break;
      }
    });

    getUser();

    return unsubscribe;
  }, []);

  const getUser = async (): Promise<void> => {
    getCurrentSession();
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error(error);
      console.log("Not signed in");
    }
  };

  return (
    <div className="App">
      <button onClick={() => signInWithRedirect()}>Open Hosted UI</button>
      <button onClick={() => signOut()}>Sign Out</button>
      <div>{user?.username}</div>
    </div>
  );
}