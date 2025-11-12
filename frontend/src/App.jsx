import React from "react";
import {
  SignedIn,
  SignInButton,
  SignedOut,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

const App = () => {
  return (
    <>
      <h1>Wekcine to the app</h1>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <UserButton />
    </>
  );
};

export default App;
