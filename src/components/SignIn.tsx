import React from "react";
import { AuthUI } from "./ui/auth-fuse";

interface SignInProps {
  setCurrentPage: (page: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ setCurrentPage }) => {
  return (
    <AuthUI 
      isSignInInitial={true} 
      setCurrentPage={setCurrentPage}
      signInContent={{
        quote: { text: "Focus On Your Ambition. We Handle The rest.", author: "PAWIN CORE" },
        image: { src: "https://i.ibb.co/XrkdGrrv/original-ccdd6d6195fff2386a31b684b7abdd2e-removebg-preview.png", alt: "Tech terminal" }
      }}
    />
  );
};

export default SignIn;
