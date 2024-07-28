import { IoLogoGithub, IoLogoLinkedin, IoLogoStackoverflow, IoLogoTwitter } from "react-icons/io5";

const SOCIALS = [
	{ label: "Twitter", icon: IoLogoTwitter, href: "https://x.com/codebycruz" },
	{ label: "Linkedin", icon: IoLogoLinkedin, href: "https://linkedin.com/in/david-cruz-77243631b/" },
	{ label: "Stackoverflow", icon: IoLogoStackoverflow, href: "https://stackoverflow.com/users/19732164/oncelock" },
	{ label: "Github", icon: IoLogoGithub, href: "https://github.com/DvvCz" }
]

export default function Footer() {
	return (
		<div className="bg-celadon-200 text-white flex flex-col gap-4 mt-auto items-center w-full p-8">
			<div className="text-md font-semibold">
				© { new Date().getFullYear() } David Cruz
			</div>

			<div className="flex flex-row gap-8 text-2xl">
				{SOCIALS.map(s => (
					<a key={s.href} aria-label={s.label} href={s.href} className="hover:text-white/60">
						<s.icon />
					</a>
				))}
			</div>
		</div>
	)
}