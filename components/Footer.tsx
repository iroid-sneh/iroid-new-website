import React from "react";
import Link from "next/link";
// Optional: Install lucide-react for icons (npm install lucide-react)
import { Linkedin, Youtube, Music2, Instagram, Twitter } from "lucide-react";

const Footer = () => {
    const footerLinks = [
        {
            title: "Product",
            links: [
                { name: "In-App Payments", href: "/payments" },
                { name: "Webshop", href: "/webshop" },
                { name: "Launcher", href: "/launcher" },
                { name: "Loyalty", href: "/loyalty" },
                { name: "Merchant of Record", href: "/merchant" },
            ],
        },
        {
            title: "Resources",
            links: [
                { name: "Blog", href: "/resources?type=Blog" },
                { name: "Guides and Reports", href: "/resources?type=Blog" },
                { name: "Podcast", href: "/resources?type=Podcast" },
                { name: "Glossary", href: "/glossary" },
                { name: "Documentation", href: "https://docs.stash.gg/guides" },
            ],
        },
        {
            title: "Company",
            links: [
                { name: "Contact Sales", href: "/contact" },
                { name: "Press", href: "/press" },
                { name: "Careers", href: "/careers" },
                { name: "Player Support", href: "/support" },
            ],
        },
        {
            title: "Trust and compliance",
            links: [
                { name: "Terms of Service", href: "/legal/terms-of-services" },
                { name: "Stash End-User", href: "/legal/stash-end-user" },
                { name: "Terms of Use", href: "/legal/terms-of-use" },
                { name: "Privacy Policy", href: "/legal/privacy-policy" },
                { name: "Refund Policy", href: "/legal/refund-policy" },
                { name: "Cookie Consent", href: "/legal/cookie-statement" },
            ],
        },
    ];

    return (
        <footer className="bg-black text-[#F7F9F4] pt-24 pb-8 px-6 md:px-12 font-sans">
            <div className="max-w-[1440px] mx-auto">
                {/* Top Section: Socials + Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                    {/* Social Icons Column */}
                    <div className="md:col-span-3 flex flex-col gap-4">
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="#"
                                className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
                            >
                                <Linkedin size={20} />
                            </Link>
                            <Link
                                href="#"
                                className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
                            >
                                <Youtube size={20} />
                            </Link>
                            <Link
                                href="#"
                                className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors"
                            >
                                <Music2 size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="md:col-span-9 grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {footerLinks.map((section) => (
                            <div
                                key={section.title}
                                className="flex flex-col gap-4"
                            >
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                                    {section.title}
                                </h3>
                                <ul className="flex flex-col gap-3">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-base hover:text-white transition-colors duration-200 block"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section: Huge Logo */}
                <div className="w-full mt-10">
                    <img
                        src="/iRoidLogoWhite.svg"
                        alt="Company Logo"
                        className="w-full h-auto opacity-90"
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
