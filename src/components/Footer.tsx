import { FaGithub, FaLinkedin, FaStackOverflow } from "react-icons/fa";

const SOCIALS = [
	{
		label: "X",
		icon: () => <span className="align-text-top">𝕏</span>,
		href: "https://x.com/codebycruz",
	},
	{
		label: "Linkedin",
		icon: FaLinkedin,
		href: "https://linkedin.com/in/david-cruz-77243631b/",
	},
	{
		label: "Stackoverflow",
		icon: FaStackOverflow,
		href: "https://stackoverflow.com/users/19732164/oncelock",
	},
	{ label: "Github", icon: FaGithub, href: "https://github.com/DvvCz" },
];

export default function Footer() {
	return (
		<div className="bg-celadon-200 text-white flex flex-col gap-4 mt-auto items-center w-full p-8 py-8">
			<div className="flex flex-row items-center gap-8 text-2xl">
				{SOCIALS.map((s, i) => (
					<a
						key={i}
						aria-label={s.label}
						href={s.href}
						className="hover:text-white/60"
					>
						<s.icon />
					</a>
				))}
			</div>
		</div>
	);
}
