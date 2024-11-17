"use server";

import { FaGithub } from "react-icons/fa";
import { GiWoodenCrate } from "react-icons/gi";
import dedent from "dedent";
import { markdownToHTML } from "./markdown";

export type Project = {
	name: string;
	imgs: string[];
	tags: string[];
	links: { icon: string; href: string }[];
	desc: string;
	html?: string;
};

export type ProjectHTML = Project & { html: string };

const PROJECTS: Project[] = [
	{
		name: "dasm",
		imgs: ["dasm.png"],
		tags: ["x86", "Rust", "Systems"],
		links: [
			{ icon: "FaGithub", href: "https://github.com/DvvCz/dasm" },
			{ icon: "FaBox", href: "https://crates.io/crates/dasm" },
		],
		desc: dedent`
			# dasm
			dasm (**d**ynamic **as**se**m**bler) is a library for the [Rust](https://www.rust-lang.org) programming language [hosted on Crates.io for anyone to use](https://crates.io/crates/dasm).
			It provides the bare essentials in order to generate machine code for various architectures at runtime, currently supporting a subset of x86-64.

			This means you are able to create optimized, native functions with dynamic information.
			The library is mostly geared toward the creation of [JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation) compilers.

			Using it, I created a lisp compiler in around ~200 LOC that can compile this example ahead of time, and run it on your machine without the overhead of an interpreter.
			[Run the example here.](https://github.com/DvvCz/dasm/tree/master/examples/tinylisp)

			\`\`\`lisp
			(set rsi "Hello, world!") ; addr
			(set rdx 14) ; length
			(set rdi 1) ; fd (stdout)
			(set rax 1) ; sys_write
			(syscall)

			; Nest however many you want. Uses the stack.
			(ret (add 2 (add 2 4)))
			\`\`\`
		`,
	},
	{
		name: "riptire",
		imgs: [
			"https://github.com/DvvCz/riptire/blob/master/assets/home.png?raw=true",
			"https://github.com/DvvCz/riptire/blob/master/assets/trending.png?raw=true",
			"https://github.com/DvvCz/riptire/blob/master/assets/subscriptions.png?raw=true",
			"https://github.com/DvvCz/riptire/blob/master/assets/watch.png?raw=true",
		],
		tags: [
			"Typescript",
			"SolidJS",
			"Frontend",
			"Web Development",
			"Github Actions",
		],
		links: [
			{ icon: "FaGithub", href: "https://github.com/DvvCz/riptire" },
			{ icon: "FaGlobe", href: "https://dvvcz.github.io/riptire" },
		],
		desc: dedent`
			# riptire

			Riptire is a frontend for [Invidious](https://invidious.io/) services.
			Invidious is an alternate, self-hostable version of YouTube.

			Riptire was created as my response to YouTube making the client unfriendlier to lower-end machines in its effort to fight ad-blockers.
			It combines the fact that Invidious is a separate, open source, ad-free experience, with a sleek, performant UI.

			It's written with [SolidJS](https://www.solidjs.com/), a framework well known for its performance due to its ahead of time compilation.
			[You can try it out here.](https://dvvcz.github.io/riptire/#/)

			*Note: Invidious instances are hard to maintain and not very stable, so expect connection issues here and there.*
		`,
	},
	{
		name: "other",
		imgs: ["other.png"],
		tags: ["Rust", "HDL", "FPGA", "C", "Compilers"],
		links: [{ icon: "FaGithub", href: "https://github.com/DvvCz" }],

		desc: dedent`
			# other

			I have a variety of other projects not currently listed here for a number of reasons:

			- I haven't gotten to it yet.
			- They aren't as visual or interactive
			- Some of them are private, as work is done on them.

			You can check my [GitHub profile](https://github.com/DvvCz) for everything I've published.
		`,
	},
];

export async function getProjects(): Promise<ProjectHTML[]> {
	return await Promise.all(
		PROJECTS.map(async (p) => {
			p.html = await markdownToHTML(p.desc);
			return p;
		}) as any,
	);
}
