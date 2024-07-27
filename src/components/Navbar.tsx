import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { IoMenu, IoDocumentText, IoFlask, IoAt, IoAtCircle, IoFlaskOutline, IoDocumentTextOutline } from "react-icons/io5";

const LINKS = [
	{ href: "/resume", disp: "Resume", icon: IoDocumentText },
	{ href: "/projects", disp: "Projects", icon: IoFlask },
	// { href: "/contact", disp: "Contact", icon: IoAtCircle }
];

function Logo() {
	return (
		<div className="text-white text-xl">
			<a href="/">
				codebycruz
			</a>
		</div>
	)
}

export default function Navbar() {
	return (
		<div className="bg-gradient-to-r from-van_dyke-400 to-van_dyke-600 drop-shadow-2xl h-24 px-8 items-center text-white flex flex-row sticky top-0">
			<div className="md:hidden absolute">
				<Menu>
					<MenuButton>
						<IoMenu className="text-3xl text-center"/>
					</MenuButton>

					<MenuItems
						className="flex flex-col bg-white text-black rounded-lg"
						anchor="bottom start"
					>
						{LINKS.map(l => (
							<MenuItem key={l.href}>
								<a href={l.href} className="rounded-lg flex flex-row items-center gap-2 px-4 py-2 hover:bg-black/5">
									{l.disp}
									<l.icon className="text-black/80" />
								</a>
							</MenuItem>
						))}
					</MenuItems>
				</Menu>
			</div>

			<div className="flex flex-row w-full items-center justify-center md:justify-between">
				<Logo />

				<div className="hidden md:flex flex-row items-center gap-2 h-full">
					{LINKS.map(l => (
						<a key={l.href} href={l.href} className="flex flex-row gap-2 items-center transition-all duration-300 shadow-xl bg-sea_green-600 active:shadow-none text-white/85 hover:text-white py-4 px-4 rounded-full">
							{l.disp}
							<l.icon />
						</a>
					))}
				</div>
			</div>
		</div>
	)
}