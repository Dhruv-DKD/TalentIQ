import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios.js";
import { useQueryClient } from "@tanstack/react-query";


const HomePage = () => {
  // const queryClient = useQueryClient();
  
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => toast.success("This is a success toast")}
      >
        Click me
      </button>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <UserButton />
    </div>
  );
};

export default HomePage;
