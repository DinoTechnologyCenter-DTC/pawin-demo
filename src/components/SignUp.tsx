import React from "react";
import { AuthUI } from "./ui/auth-fuse";

interface SignUpProps {
  setCurrentPage: (page: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ setCurrentPage }) => {
  return (
    <AuthUI 
      isSignInInitial={false} 
      setCurrentPage={setCurrentPage}
      signUpContent={{
        quote: { text: "The first step to success is to innovate.", author: "PAWIN RECRUITER" },
        image: { src: "https://i.ibb.co/HTZ6DPsS/original-33b8479c324a5448d6145b3cad7c51e7-removebg-preview.png", alt: "Esports Arena" }
      }}
    />
  );
};

export default SignUp;
