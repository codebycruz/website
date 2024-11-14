import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import {
	IoMenu,
	IoDocumentText,
	IoFlask,
	IoAt,
	IoAtCircle,
	IoFlaskOutline,
	IoDocumentTextOutline,
} from "react-icons/io5";

const LINKS = [
	{ href: "/resume", disp: "Resume", icon: IoDocumentText },
	{ href: "/projects", disp: "Projects", icon: IoFlask },
];

function Logo() {
	return (
		<div className="text-white font-bold [text-shadow:_0_2px_0_rgb(0_0_0_/20%)] text-xl">
			<a href="/">
				<img
					src="/icon_nobg.svg"
					className="w-12 object-contain hover:bg-celadon-300 transition duration-300 rounded-full"
				/>
			</a>
		</div>
	);
}

export default function Navbar() {
	return (
		<div className="z-10 drop-shadow-2xl border-b border-b-neutral-500 h-20 px-8 items-center text-white flex flex-row top-0">
			<div className="md:hidden absolute">
				<Menu>
					<MenuButton>
						<IoMenu className="text-3xl text-center" />
					</MenuButton>

					<MenuItems
						transition
						className="z-20 drop-shadow-2xl flex flex-col bg-white text-black rounded-lg"
						anchor="bottom start"
					>
						{LINKS.map((l) => (
							<MenuItem key={l.href}>
								<a
									href={l.href}
									className="rounded-lg font-medium flex flex-row items-center gap-2 px-6 py-3 hover:bg-black/5"
								>
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
					{LINKS.map((l) => (
						<a
							key={l.href}
							href={l.href}
							className="font-medium flex flex-row gap-2 items-center transition-all duration-300 shadow-2xl active:shadow-none hover:bg-celadon-300 text-white py-4 px-4"
						>
							{l.disp}
							<l.icon />
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
