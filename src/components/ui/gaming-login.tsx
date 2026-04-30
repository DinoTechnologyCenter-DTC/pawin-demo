'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, Chrome, Twitter, Github, Gamepad2 } from 'lucide-react';
import { cn } from "@/lib/utils";

interface LoginFormProps {
    onSubmit: (email: string, password: string, remember: boolean) => void;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    switchText?: string;
    switchActionText?: string;
    onSwitch?: () => void;
}

interface VideoBackgroundProps {
    videoUrl: string;
}

interface FormInputProps {
    icon: React.ReactNode;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

interface SocialButtonProps {
    icon: React.ReactNode;
    name: string;
}

interface ToggleSwitchProps {
    checked: boolean;
    onChange: () => void;
    id: string;
}

// FormInput Component
const FormInput: React.FC<FormInputProps> = ({ icon, type, placeholder, value, onChange, required }) => {
    return (
        <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[#ffae1f] transition-colors">
                {icon}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#ffae1f]/50 transition-colors"
            />
        </div>
    );
};

// SocialButton Component
const SocialButton: React.FC<SocialButtonProps> = ({ icon }) => {
    return (
        <button className="flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors">
            {icon}
        </button>
    );
};

// ToggleSwitch Component
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, id }) => {
    return (
        <div className="relative inline-block w-10 h-5 cursor-pointer" onClick={(e) => { e.stopPropagation(); onChange(); }}>
            <input
                type="checkbox"
                id={id}
                className="sr-only"
                checked={checked}
                readOnly
            />
            <div className={`absolute inset-0 rounded-full transition-colors duration-200 ease-in-out ${checked ? 'bg-[#ffae1f]' : 'bg-white/20'}`}>
                <div className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ease-in-out ${checked ? 'transform translate-x-5' : ''}`} />
            </div>
        </div>
    );
};

// VideoBackground Component
const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Video autoplay failed:", error);
            });
        }
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-slate-950/60 z-10" />
            <video
                ref={videoRef}
                className="absolute inset-0 min-w-full min-h-full object-cover w-auto h-auto opacity-40"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

// Main LoginForm Component
const LoginForm: React.FC<LoginFormProps> = ({ 
    onSubmit, 
    title = "PAWINGate", 
    subtitle = "Your journey to success awaits",
    buttonText = "Enter PAWINGate",
    switchText = "Don't have an account?",
    switchActionText = "Create Account",
    onSwitch
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSuccess(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        onSubmit(email, password, remember);
        setIsSubmitting(false);
        setIsSuccess(false);
    };

    return (
        <div className="p-10 rounded-3xl backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl">
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-black mb-2 relative group uppercase italic tracking-tighter">
                    <span className="absolute -inset-1 bg-gradient-to-r from-[#ffae1f]/30 via-[#fe4f51]/30 to-[#ffae1f]/30 blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></span>
                    <span className="relative inline-block text-white">
                        {title}
                    </span>
                </h2>
                <p className="text-white/60 flex flex-col items-center space-y-1 font-medium">
                    <span className="relative group cursor-default">
                        <span className="relative inline-block animate-pulse uppercase tracking-[0.2em] text-[10px] font-bold">{subtitle}</span>
                    </span>
                    <span className="text-[10px] text-white/30 animate-pulse uppercase tracking-widest mt-2">
                        [ Proceed to Authentication ]
                    </span>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                    icon={<Mail size={18} />}
                    type="email"
                    placeholder="Email identity"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="relative group">
                    <FormInput
                        icon={<Lock size={18} />}
                        type={showPassword ? "text" : "password"}
                        placeholder="Security code"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setRemember(!remember)}>
                        <ToggleSwitch
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                            id="remember-me"
                        />
                        <span className="text-xs text-white/60 font-bold uppercase tracking-wider">Remember Session</span>
                    </div>
                    <a href="#" className="text-xs text-[#ffae1f]/80 uppercase font-black hover:text-[#ffae1f] transition-colors">
                        Reset Key?
                    </a>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl relative overflow-hidden group transition-all duration-300 transform hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                    <div className={cn(
                        "absolute inset-0 bg-gradient-to-r from-[#ffae1f] to-[#fe4f51] transition-opacity duration-300",
                        isSuccess ? "opacity-0" : "opacity-100"
                    )} />
                    <div className={cn(
                        "absolute inset-0 bg-green-500 transition-opacity duration-300 flex items-center justify-center",
                        isSuccess ? "opacity-100" : "opacity-0"
                    )}>
                        <span className="text-white font-black uppercase tracking-widest">Access Granted</span>
                    </div>
                    <span className="relative text-white font-black text-lg uppercase tracking-widest">
                        {isSubmitting ? 'Verifying...' : buttonText}
                    </span>
                </button>
            </form>

            <div className="mt-10">
                <div className="relative flex items-center justify-center">
                    <div className="border-t border-white/5 absolute w-full"></div>
                    <div className="bg-transparent px-4 relative text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">
                        External Protocols
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                    <SocialButton icon={<Chrome size={20} />} name="Google" />
                    <SocialButton icon={<Twitter size={20} />} name="X" />
                    <SocialButton icon={<Github size={20} />} name="Github" />
                </div>
            </div>

            <p className="mt-8 text-center text-xs font-black uppercase tracking-[0.2em] text-white/40 leading-relaxed">
                {switchText}{' '}
                <button 
                    onClick={onSwitch}
                    className="font-black text-[#ffae1f] hover:text-white transition-colors underline decoration-2 underline-offset-4"
                >
                    {switchActionText}
                </button>
            </p>
        </div>
    );
};

// Export components
const GamingLogin = {
    LoginForm,
    VideoBackground
};

export default GamingLogin;
