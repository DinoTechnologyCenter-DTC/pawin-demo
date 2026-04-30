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
			className={cn('relative z-50 h-auto md:h-[420px] w-full bg-slate-900', className)}
			style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
			{...props}
		>
			<div className="md:fixed md:bottom-0 md:h-[420px] w-full">
				<div className="md:sticky md:top-[calc(100vh-420px)] h-full">
					<div className="relative z-10 flex size-full flex-col justify-between gap-5 border-t px-6 py-12 md:px-12 md:py-6 bg-slate-900 border-slate-800">
						<div
							aria-hidden
							className="absolute inset-0 isolate z-0 contain-strict"
						>
							<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,174,31,0.06)_0,rgba(254,79,81,0.02)_50%,rgba(255,174,31,0.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
							<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,174,31,0.04)_0,rgba(255,174,31,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
							<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,174,31,0.04)_0,rgba(255,174,31,0.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
						</div>
						{/* Branding and Links Wrapper */}
						<div className="max-w-[1280px] mx-auto w-full mt-8 flex flex-col md:flex-row xl:mt-0 justify-between items-center md:items-start gap-12 text-center md:text-left">
							<AnimatedContainer className="w-full max-w-sm space-y-6">
								<div className="flex justify-center md:justify-start">
									<Logo className="h-28 w-auto" />
								</div>
								<p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
									Innovative platform empowering innovators, investors, and community with seamless connections and opportunities worldwide.
								</p>
								<div className="flex flex-wrap justify-center md:justify-start gap-4">
									{socialLinks.map((link) => (
										<a key={link.title} href={link.href} target="_blank" rel="noopener noreferrer">
											<Button size="icon" variant="outline" className="size-10 rounded-full border-slate-700 hover:bg-slate-800 hover:text-[#ffae1f] transition-all">
												<link.icon className="size-5" />
											</Button>
										</a>
									))}
								</div>
							</AnimatedContainer>

							{/* Link Groups - 2 Columns on Mobile */}
							<div className="w-full md:flex-1 grid grid-cols-2 md:flex md:flex-row justify-end gap-y-10 gap-x-4 md:gap-16 lg:gap-20 text-left">
								{footerLinkGroups.map((group, index) => (
									<AnimatedContainer
										key={group.label}
										delay={0.1 + index * 0.1}
										className="min-w-[120px]"
									>
										<div>
											<h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4">{group.label}</h3>
											<ul className="text-slate-400 space-y-3 text-sm">
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
														<>
															{link.icon && <link.icon className="me-1 size-4" />}
															{link.title}
														</>
													);
													
													return (
														<li key={link.title}>
															{link.href && !link.page && !link.onClick ? (
																<a
																	href={link.href}
																	className="hover:text-[#ffae1f] inline-flex items-center transition-all duration-300"
																>
																	{linkContent}
																</a>
															) : (
																<button
																	onClick={handleClick}
																	className="hover:text-[#ffae1f] inline-flex items-center transition-all duration-300 text-left"
																>
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
						<div className="text-slate-400/60 flex flex-col items-center justify-between gap-6 border-t border-slate-800/50 pt-8 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] md:flex-row">
							<p className="order-2 md:order-1">© 2026 PAWIN. All rights reserved.</p>
							<div className="order-1 md:order-2 text-center">
								<p className="text-[#ffae1f]/60">#PamojaWinners | #ThinkBeyond | #AfricaForward</p>
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