import { IoPricetag } from "react-icons/io5"

const PROJECTS = [
	{
		name: "ramattra",
		href: "https://github.com/DvvCz/ramattra",
		src: "https://github.com/DvvCz/ramattra/blob/master/assets/example.png?raw=true",
		desc: "An advanced programming language intended for use as a game scripting language for the massively popular online shooter game, Overwatch. Featuring LSP, advanced typing system and familiarity to modern programming languages for developers.",
		tags: [ "Typescript", "React", "Compilers", "CI", "Github Actions" ]
	},
	{
		name: "cpkg",
		href: "https://github.com/DvvCz/cpkg",
		src: "cpkg.png",
		desc: "A dead simple package manager for C. Easily manage local and git dependencies, as well as test and compile your programs.",
		tags: [ "C", "Rust", "Git", "Windows", "Linux" ]
	},
	{
		name: "propc-online",
		href: "https://github.com/DvvCz/propc-online",
		src: "https://github.com/DvvCz/propc-online/blob/master/assets/overview.gif?raw=true",
		desc: "An alternative IDE experience for writing Propeller C code for use in Parallax Robots. Written for students who want an alternative to block programming. Makes use of the Monaco Editor, with C intellisense, github repository imports, multiple files, and more!",
		tags: [ "JavaScript", "Typescript", "Github Actions" ]
	}
]

export default function Projects() {
	return (
		<>
			<div className="text-sea_green-400 text-center mt-8 text-xl">
				Here's a few of my recent or noteworthy projects I'm fond of.
			</div>

			<div className="lg:hidden mt-2 text-black/40 text-md text-center">
				PS: Sorry the images are bad.. haven't gotten to getting new ones for mobile.
			</div>

			<div className="flex flex-col items-center w-full bg-white p-8">
				<div className="flex flex-col gap-24 w-full max-w-4xl">
					{PROJECTS.map(p => (
						<a key={p.href} href={p.href} className="rounded-lg bg-van_dyke-400 drop-shadow-2xl">
							<img loading="lazy" src={p.src} className="h-full min-h-96 rounded-t-lg object-cover" />

							<div className="p-8">
								<div className="text-blue-400 underline text-lg font-semibold">
									{p.name}
								</div>

								<div className="text-white text-normal">
									{p.desc}
								</div>

								<div className="text-white/95 text-sm md:text-md overflow-x-auto flex flex-row gap-2">
									{p.tags.map(t => (
										<span key={t} className="text-nowrap">
											<IoPricetag className="inline mr-px"/>
											{t}
										</span>
									))}
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</>
	)
}