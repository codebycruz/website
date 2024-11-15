import { IoPricetag } from "react-icons/io5";

const PROJECTS = [
	{
		name: "ramattra",
		href: "https://github.com/DvvCz/ramattra",
		src: "https://github.com/DvvCz/ramattra/blob/master/assets/example.png?raw=true",
		desc: "An advanced programming language intended for use as a game scripting language for the massively popular online shooter game, Overwatch. Featuring LSP, advanced typing system and familiarity to modern programming languages for developers.",
		tags: ["Typescript", "React", "Compilers", "CI", "Github Actions"],
	},
	{
		name: "cpkg",
		href: "https://github.com/DvvCz/cpkg",
		src: "cpkg.png",
		desc: "A dead simple package manager for C. Easily manage local and git dependencies, as well as test and compile your programs.",
		tags: ["C", "Rust", "Git", "Windows", "Linux"],
	},
	{
		name: "propc-online",
		href: "https://github.com/DvvCz/propc-online",
		src: "https://github.com/DvvCz/propc-online/blob/master/assets/overview.gif?raw=true",
		desc: "An alternative IDE experience for writing Propeller C code for use in Parallax Robots. Written for students who want an alternative to block programming. Makes use of the Monaco Editor, with C intellisense, github repository imports, multiple files, and more!",
		tags: ["JavaScript", "Typescript", "Github Actions"],
	},
];

export default function Projects() {
	return (
		<div className="w-full py-56 flex text-xl font-medium flex-col items-center justify-center text-center">
			<div className="text-8xl mb-8">🛠️</div>

			<div>Redoing this part, back soon!</div>

			<a
				className="text-blue-400 underline"
				href="https://github.com/DvvCz"
			>
				Check out my GitHub profile in the meantime.
			</a>
		</div>
	);
}
