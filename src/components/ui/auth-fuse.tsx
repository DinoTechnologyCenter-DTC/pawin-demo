"use client";

import * as React from "react";
import { useState, useId, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { DottedSurface } from "./dotted-surface";

export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    textArray.length,
    textArrayIndex,
  ]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

import { Button } from "./button";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-sm text-white shadow-sm transition-all placeholder:text-slate-500 focus-visible:bg-slate-800 focus-visible:ring-1 focus-visible:ring-[#ffae1f]/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, ...props }, ref) => {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    return (
      <div className="grid w-full items-center gap-2">
        {label && <Label htmlFor={id} className="text-xs font-semibold text-slate-400 pl-1">{label}</Label>}
        <div className="relative">
          <Input id={id} type={showPassword ? "text" : "password"} className={cn("pe-10 bg-slate-800/50 border-slate-700/50", className)} ref={ref} {...props} />
          <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center text-slate-500 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? (<EyeOff className="size-4" aria-hidden="true" />) : (<Eye className="size-4" aria-hidden="true" />)}
          </button>
        </div>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

function SignInForm({ onSubmit }: { onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <form onSubmit={onSubmit} autoComplete="on" className="flex flex-col gap-4 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">Sign In</h1>
        <p className="text-sm text-slate-400">Welcome back, Winner</p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs font-semibold text-slate-400 pl-1">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required autoComplete="email" className="bg-slate-800/50 border-slate-700/50" />
        </div>
        <PasswordInput name="password" label="Password" required autoComplete="current-password" placeholder="••••••••" />
        <Button type="submit" variant="brand" size="xl" className="mt-2 h-12 shadow-lg shadow-[#ffae1f]/10">
            Sign In
        </Button>
      </div>
    </form>
  );
}

import { AnimatePresence, motion } from "framer-motion";

function SignUpForm({ onSubmit }: { onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    selection: ""
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const roles = [
    { id: 'innovator', label: 'Innovator', desc: 'I have a project to build.' },
    { id: 'investor', label: 'Investor', desc: 'I want to fund innovation.' },
    { id: 'community', label: 'Community', desc: 'I want to help and grow.' }
  ];

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  // Password Strength Logic
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(formData.password);
  const strengthConfig = [
    { label: "Too Weak", color: "bg-red-500/50", text: "text-red-400" },
    { label: "Weak", color: "bg-orange-500/50", text: "text-orange-400" },
    { label: "Fair", color: "bg-yellow-500/50", text: "text-yellow-400" },
    { label: "Strong", color: "bg-green-500/50", text: "text-green-500" },
    { label: "Ultra Strong", color: "bg-emerald-500", text: "text-emerald-400" },
  ];

  // Step Indicators
  const StepLabel = () => (
    <div className="flex justify-center gap-1 mb-1">
      {[0, 1, 2, 3].map((s) => (
        <div 
          key={s} 
          className={cn(
            "h-1 rounded-full transition-all duration-700",
            s === step ? "w-10 bg-[#ffae1f]" : "w-4 bg-slate-800"
          )}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col justify-start">
      <StepLabel />
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col gap-4 mt-0"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-white italic">Create Account</h1>
              <p className="text-sm text-slate-400">First, what should we call you?</p>
            </div>
            <div className="grid gap-4">
              <Input 
                autoFocus
                id="name" 
                placeholder="Your full name" 
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white h-14 text-center text-lg" 
              />
              <Button disabled={!formData.name} onClick={handleNext} variant="brand" size="xl" className="h-12 shadow-lg shadow-[#ffae1f]/10">
                  Continue
              </Button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col gap-4 mt-0"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-white italic">Create Account</h1>
              <p className="text-sm text-slate-400">Great! What is your email address?</p>
            </div>
            <div className="grid gap-4">
              <Input 
                autoFocus
                type="email"
                placeholder="m@example.com" 
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white h-14 text-center text-lg" 
              />
              <Button disabled={!formData.email} onClick={handleNext} variant="brand" size="xl" className="h-12 shadow-lg shadow-[#ffae1f]/10">
                  Almost there
              </Button>
              <button onClick={handleBack} className="text-xs text-slate-500 hover:text-slate-300">Go Back</button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col gap-4 mt-0"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-white italic">Create Account</h1>
              <p className="text-sm text-slate-400">Secure your account with a password</p>
            </div>
            <div className="grid gap-4 mt-2">
              <PasswordInput 
                autoFocus
                placeholder="••••••••" 
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white h-14 text-center text-lg rounded-xl" 
              />
              
              {/* Password Strength Meter */}
              {formData.password && (
                <div className="space-y-2 animate-in fade-in duration-500">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Security Health</span>
                    <span className={cn("text-[10px] uppercase font-bold tracking-widest", strengthConfig[strength].text)}>{strengthConfig[strength].label}</span>
                  </div>
                  <div className="flex gap-1 h-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "flex-1 rounded-full transition-all duration-500",
                          i <= strength ? strengthConfig[strength].color : "bg-slate-800"
                        )}
                      />
                    ))}
                  </div>
                </div>
              )}

              <Button disabled={strength < 2} onClick={handleNext} variant="brand" size="xl" className="h-12 shadow-lg shadow-[#ffae1f]/10">
                  One last thing
              </Button>
              <button onClick={handleBack} className="text-xs text-slate-500 hover:text-slate-300">Go Back</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col gap-4 mt-0"
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-white italic">Almost there</h1>
              <p className="text-sm text-slate-400">Select your primary role in the ecosystem</p>
            </div>
            <div className="grid gap-3 mt-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => updateField('selection', role.id)}
                  className={cn(
                    "w-full p-4 rounded-xl border text-left transition-all duration-300 group",
                    formData.selection === role.id 
                      ? "border-[#ffae1f] bg-[#ffae1f]/10 ring-1 ring-[#ffae1f]" 
                      : "border-slate-800 hover:border-slate-700 bg-slate-800/40"
                  )}
                >
                  <p className={cn("font-bold transition-colors", formData.selection === role.id ? "text-white" : "text-slate-300 group-hover:text-white")}>{role.label}</p>
                  <p className="text-xs text-slate-500">{role.desc}</p>
                </button>
              ))}
              <Button 
                disabled={!formData.selection}
                onClick={onSubmit as any}
                variant="brand" 
                size="xl" 
                className="mt-4 h-14 shadow-lg shadow-[#ffae1f]/10"
              >
                Complete Account Setup
              </Button>
              <button onClick={handleBack} className="text-xs text-slate-500 hover:text-slate-300">Go Back</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AuthFormContainer({ isSignIn, onToggle, onSubmit, setCurrentPage }: { isSignIn: boolean; onToggle: () => void; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; setCurrentPage: (page: string) => void }) {
    return (
        <div className="mx-auto grid w-full max-w-[360px] gap-0">
            {/* PAWIN Logo Top - Pulled ultra-close with -mb-14 */}
            <div className="flex justify-center -mb-14 transition-all duration-500 relative z-10">
                <button onClick={() => setCurrentPage('home')} className="hover:scale-105 transition-transform duration-500 focus-visible:outline-none focus:outline-none">
                    <img src="/img/pawin_logo.png" className="h-40 w-auto brightness-110" alt="" aria-hidden="true" />
                </button>
            </div>

            {isSignIn ? <SignInForm onSubmit={onSubmit} /> : <SignUpForm onSubmit={onSubmit} />}
            
            <div className="text-center text-sm text-slate-500 mt-6">
                {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
                <Button variant="link" className="pl-1 h-auto py-0 font-bold text-[#fe4f51] hover:text-[#ffae1f]" onClick={onToggle}>
                    {isSignIn ? "Sign Up" : "Sign In"}
                </Button>
            </div>
            
            <div className="relative text-center text-[10px] font-bold uppercase tracking-widest text-slate-600 mt-6">
                <div className="absolute inset-0 top-1/2 -z-0 border-t border-slate-800" />
                <span className="relative z-10 bg-slate-900 px-4">OR CONTINUE WITH</span>
            </div>

            {/* Google Icon Circular Card */}
            <div className="flex justify-center mt-4">
              <Button 
                  variant="outline" 
                  type="button" 
                  className="h-12 w-12 rounded-full border-slate-800 text-white p-0 hover:bg-slate-800 transition-all group shadow-lg shadow-black/20"
                  onClick={() => console.log("Google Login")}
              >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 group-hover:scale-110 transition-transform" alt="" aria-hidden="true" />
              </Button>
            </div>

            {/* Links at bottom center */}
            <div className="flex justify-center gap-8 mt-16 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700">
                <button onClick={() => setCurrentPage('home')} className="hover:text-slate-400 hover:underline underline-offset-4 transition-all duration-300">Home</button>
                <button onClick={() => setCurrentPage('privacy-policy')} className="hover:text-slate-400 hover:underline underline-offset-4 transition-all duration-300">Privacy Policy</button>
                <button onClick={() => setCurrentPage('terms-of-service')} className="hover:text-slate-400 hover:underline underline-offset-4 transition-all duration-300">Terms</button>
            </div>
        </div>
    )
}

interface AuthUIProps {
    isSignInInitial?: boolean;
    setCurrentPage: (page: string) => void;
}

export function AuthUI({ isSignInInitial = true, setCurrentPage }: AuthUIProps) {
  const [isSignIn, setIsSignIn] = useState(isSignInInitial);
  
  useEffect(() => {
    setIsSignIn(isSignInInitial);
  }, [isSignInInitial]);

  const toggleForm = () => {
    const nextState = !isSignIn;
    setIsSignIn(nextState);
    setCurrentPage(nextState ? 'signin' : 'signup');
  };

  const handleAuthSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage('home');
  };

  return (
    <div className="w-full min-h-screen h-screen flex items-center justify-center bg-slate-900 text-slate-300 overflow-hidden relative">
      <DottedSurface />
      <style>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
          display: none;
        }
        body { overflow: hidden; }
      `}</style>
      
      {/* Centered Form Container */}
      <div className="w-full max-w-lg p-8 md:p-12 relative z-50">
        <AuthFormContainer isSignIn={isSignIn} onToggle={toggleForm} onSubmit={handleAuthSubmit} setCurrentPage={setCurrentPage} />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#ffae1f]/5 blur-[120px] -z-10 rounded-full" />
    </div>
  );
}
