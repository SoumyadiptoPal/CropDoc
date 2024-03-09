import React from "react";
import { SignedInStack, SignedOutStack } from "./Navigation";
import { useEffect } from "react";
import { useState } from "react";
import { firebase } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
      const auth = getAuth(firebase);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("Available")
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
          console.log(" Not Available")
        }
      });
  }, []);

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
