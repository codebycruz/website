import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoMenu, IoDocumentText, IoFlask, IoNewspaper } from "react-icons/io5";

const LINKS = [
	{ href: "/projects", disp: "Projects", icon: IoFlask },
	{ href: "/blog", disp: "Blog", icon: IoNewspaper },
	{ href: "/resume", disp: "Resume", icon: IoDocumentText },
];

function Logo() {
	return (
		<a href="/">
			<img
				src="/icon_nobg.svg"
				className="w-12 object-contain transition duration-300 rounded-full"
			/>
		</a>
	);
}

export default function Navbar() {
	return (
		<div className="border-b border-b-neutral-500 h-20 px-8 items-center flex flex-row">
			<div className="md:hidden absolute">
				<Menu>
					<MenuButton>
						<IoMenu className="text-3xl text-center" />
					</MenuButton>

					<MenuItems
						transition
						className="z-20 drop-shadow-2xl flex flex-col bg-van_dyke-200 border border-white rounded-lg"
						anchor="bottom start"
					>
						{LINKS.map((l, i) => (
							<MenuItem key={i}>
								<a
									href={l.href}
									className="rounded-lg font-medium flex flex-row items-center gap-2 px-6 py-3 hover:bg-black/5"
								>
									{l.disp}
									<l.icon />
								</a>
							</MenuItem>
						))}
					</MenuItems>
				</Menu>
			</div>

			<div className="flex flex-row w-full items-center justify-center md:justify-between">
				<Logo />

				<div className="hidden md:flex flex-row items-center gap-2 h-full">
					{LINKS.map((l, i) => (
						<a
							key={i}
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
