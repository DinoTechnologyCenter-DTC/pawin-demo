import React from 'react';
import { cn } from '../../lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from './button';
import { 
	TikTokIcon, 
	InstagramIcon, 
	LinkedInIcon, 
	YouTubeIcon, 
	WhatsAppIcon 
} from '../icons';
import Logo from '../Logo';

interface FooterLink {
	title: string;
	href?: string;
	page?: string;
	icon?: React.ComponentType<{ className?: string }>;
	onClick?: () => void;
}
interface FooterLinkGroup {
	label: string;
	links: FooterLink[];
}

interface StickyFooterProps extends React.ComponentProps<'footer'> {
	setCurrentPage?: (page: string) => void;
	className?: string;
}

export function StickyFooter({ className, setCurrentPage, ...props }: StickyFooterProps) {
	return (
		<footer
			className={cn('relative z-50 h-auto lg:h-[380px] w-full bg-slate-900', className)}
			style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
			{...props}
		>
			<div className="lg:fixed lg:bottom-0 lg:h-[380px] w-full">
				<div className="lg:sticky lg:top-[calc(100vh-380px)] h-full">
					<div className="relative z-10 flex size-full flex-col justify-between gap-2 border-t px-6 py-8 md:px-12 lg:py-4 bg-slate-900 border-slate-800">
						<div
							aria-hidden
							className="absolute inset-0 isolate z-0 contain-strict"
						>
							<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,174,31,0.06)_0,rgba(254,79,81,0.02)_50%,rgba(255,174,31,0.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
							<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,174,31,0.04)_0,rgba(255,174,31,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
							<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,174,31,0.04)_0,rgba(255,174,31,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
						</div>
						{/* Branding and Links Wrapper */}
						<div className="max-w-[1600px] mx-auto w-full mt-4 flex flex-col lg:flex-row xl:mt-0 justify-center items-start gap-12 lg:gap-32 xl:gap-48 text-left px-6 md:px-12 lg:px-20">
							<AnimatedContainer className="w-full lg:w-auto max-w-sm space-y-4 lg:min-w-[340px]">
								<div className="flex justify-start">
									<Logo className="h-20 md:h-24 lg:h-28 w-auto object-contain object-left transition-transform hover:scale-105 duration-500" />
								</div>
								<div className="space-y-4">
									<p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm">
										Innovative platform empowering innovators, investors, and youth community with seamless connections and opportunities worldwide.
									</p>
									<div className="flex flex-wrap justify-start gap-5 pt-2">
										{socialLinks.map((link) => (
											<a key={link.title} href={link.href} target="_blank" rel="noopener noreferrer" title={link.title}>
												<Button size="icon" variant="outline" className="size-11 rounded-full border-slate-800 bg-slate-900/50 hover:bg-slate-800 hover:text-[#ffae1f] transition-all duration-300 hover:border-[#ffae1f]/40 hover:shadow-[0_0_15px_rgba(255,174,31,0.1)]">
													<link.icon className="size-5" />
												</Button>
											</a>
										))}
									</div>
								</div>
							</AnimatedContainer>

							{/* Link Groups */}
							<div className="w-full lg:flex-1 grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:justify-start gap-y-6 gap-x-8 lg:gap-16 xl:gap-24 text-left">
								{footerLinkGroups.map((group, index) => (
									<AnimatedContainer
										key={group.label}
										delay={0.1 + index * 0.1}
										className="min-w-[140px]"
									>
										<div>
											<h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">{group.label}</h3>
											<ul className="text-slate-400 space-y-2 text-sm md:text-base">
												{group.links.map((link) => {
													const handleClick = (e: React.MouseEvent) => {
														if (link.onClick) {
															e.preventDefault();
															link.onClick();
														} else if (link.page && setCurrentPage) {
															e.preventDefault();
															link.page && setCurrentPage(link.page);
														}
													};
													
													const linkContent = (
														<span className="flex items-center gap-2">
															{link.icon && <link.icon className="size-4" />}
															{link.title}
														</span>
													);
													
													return (
														<li key={link.title}>
															{link.href && !link.page && !link.onClick ? (
																<a
																	href={link.href}
																	className="hover:text-[#ffae1f] transition-all duration-300 flex items-center group"
																>
																	<span className="h-px w-0 bg-[#ffae1f] transition-all duration-300 group-hover:w-3 mr-0 group-hover:mr-2" />
																	{linkContent}
																</a>
															) : (
																<button
																	onClick={handleClick}
																	className="hover:text-[#ffae1f] transition-all duration-300 text-left flex items-center group"
																>
																	<span className="h-px w-0 bg-[#ffae1f] transition-all duration-300 group-hover:w-3 mr-0 group-hover:mr-2" />
																	{linkContent}
																</button>
															)}
														</li>
													);
												})}
											</ul>
										</div>
									</AnimatedContainer>
								))}
							</div>
						</div>
						
						{/* Bottom Bar */}
						<div className="border-t border-slate-800/30 pt-6 pb-4">
							<div className="max-w-[1800px] mx-auto flex flex-col items-center justify-between gap-6 px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-48 text-[10px] md:text-[11px] lg:text-xs xl:text-sm font-bold uppercase tracking-[0.4em] text-slate-500 md:flex-row">
								<p className="order-2 md:order-1 transition-colors hover:text-slate-300 cursor-default">© 2026 PAWIN. All rights reserved.</p>
								<div className="order-1 md:order-2 text-center">
									<p className="text-[#ffae1f] hover:text-[#ffae1f]/80 transition-colors cursor-default whitespace-nowrap">#PamojaWinners | #ThinkBeyond | #AfricaForward</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

const socialLinks = [
	{ title: 'Instagram', href: 'https://instagram.com/pamoja_winners?igsh=a2FuYTdscnptY20y', icon: InstagramIcon },
	{ title: 'TikTok', href: 'https://www.tiktok.com/@pawincompany8/', icon: TikTokIcon },
	{ title: 'YouTube', href: 'https://youtube.com/@pamoja_winners?si=hqPPXB9Oe8YWWF7z', icon: YouTubeIcon },
	{ title: 'WhatsApp', href: 'https://api.whatsapp.com/send/?phone=255664834083&text&type=phone_number&app_absent=0', icon: WhatsAppIcon },
	{ title: 'LinkedIn', href: 'https://www.linkedin.com/in/pawin247365', icon: LinkedInIcon },
];

const footerLinkGroups: FooterLinkGroup[] = [
	{
		label: 'Platform',
		links: [
			{ title: 'For Innovators', page: 'innovators', href: '#' },
			{ title: 'For Investors', page: 'investors', href: '#' },
			{ title: 'For Community', page: 'community', href: '#' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About Us', page: 'about', href: '#' },
			{ title: 'Careers', page: 'careers', href: '#' },
			{ title: 'Contact', page: 'contact', href: '#' },
		],
	},
	{
		label: 'Legal',
		links: [
			{ title: 'Privacy Policy', page: 'privacy-policy' },
			{ title: 'Terms of Service', page: 'terms-of-service' },
		],
	},
];

type AnimatedContainerProps = React.ComponentProps<typeof motion.div> & {
	children?: React.ReactNode;
	delay?: number;
};

function AnimatedContainer({
	delay = 0.1,
	children,
	...props
}: AnimatedContainerProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			{...props}
		>
			{children}
		</motion.div>
	);
}