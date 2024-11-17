import {
	SiRust,
	SiC,
	SiTypescript,
	SiGithub,
	SiTailwindcss,
	SiReact,
	SiNextdotjs,
	SiFigma,
} from "react-icons/si";

function Card(props: {
	href: string;
	title: string;
	desc: string;
	new?: boolean;
}) {
	return (
		<a
			href={props.href}
			className="border border-neutral-500 bg-van_dyke-200 text-white p-2 flex flex-col rounded-md"
		>
			<div className="flex flex-row gap-2">
				{props.title}
				{props.new ? <div className="text-red-600">(new)</div> : null}
			</div>

			<div className="text-white/80 line-clamp-3">{props.desc}</div>
		</a>
	);
}

export default function Home() {
	return (
		<>
			<div className="bg-van_dyke-200 flex flex-row justify-center p-12 border-b border-b-neutral-500">
				<div className="flex flex-row items-center h-full gap-12 w-full xl:w-2/3 max-w-5xl">
					<div className="flex flex-col items-center gap-4 w-full lg:w-1/2">
						<div className="text-celadon-300 text-7xl font-semibold">
							Hello!
						</div>

						<div className="text-4xl text-white text-nowrap">
							Welcome to my website.
						</div>
					</div>

					<div className="h-96 border-y border-y-white w-1/2 hidden md:flex flex-col gap-10 px-2 py-10">
						<Card
							title="👋 Welcome!"
							desc="My first post on the new website. Introduction to how I expect to run this blog and why you might want to tune in."
							href="/blog/welcome"
							new
						/>
					</div>
				</div>
			</div>

			<div className="p-8 text-white w-full flex flex-col items-center">
				<div className="flex flex-row gap-8 justify-evenly max-w-screen-2xl w-full">
					<div className="flex flex-col gap-4 max-w-sm">
						<div className="text-celadon-300 text-xl font-semibold">
							Who am I?
						</div>

						<div>
							My name is David, I am a{" "}
							<strong> 3rd year Computer Engineering </strong>
							major at{" "}
							<a
								href="https://www.calpoly.edu"
								className="underline"
							>
								🐴 Cal Poly, SLO.
							</a>{" "}
							I've been heavily involved in the study and
							community of Computer Science / Software Engineering
							for the past 6 years as my passion.
						</div>

						<div>
							I am bilingual, speaking English natively and
							Spanish lesser so.
						</div>

						<div>
							I am an Open Source aficionado, I have plenty of
							experience contributing and creating my own projects
							on{" "}
							<a
								href="https://github.com/DvvCz"
								className="inline underline text-nowrap"
							>
								<SiGithub className="mr-px inline" /> GitHub
							</a>
							, as well as managing community issues that come
							with them.
						</div>
					</div>

					<div className="flex flex-col gap-4 max-w-sm">
						<div className="text-celadon-300 text-xl font-semibold">
							What do I do?
						</div>

						<div>
							I've most recently been creating front-end, back-end
							and full-stack web applications using{" "}
							<a
								href="https://typescriptlang.org"
								className="inline text-nowrap underline"
							>
								<SiTypescript className="mr-px inline" />{" "}
								Typescript
							</a>
							,{" "}
							<a
								href="https://react.dev"
								className="inline underline"
							>
								<SiReact className="mr-px inline" /> React
							</a>
							,{" "}
							<a
								href="https://tailwindcss.com"
								className="inline underline text-nowrap"
							>
								<SiTailwindcss className="mr-px inline" />{" "}
								Tailwind
							</a>{" "}
							and{" "}
							<a
								href="https://nextjs.org"
								className="inline underline"
							>
								<SiNextdotjs className="mr-px inline" /> Next.js
							</a>
							, but I have experience using other frameworks as
							well.
						</div>

						<div>
							I also create native applications, specializing in{" "}
							<a
								href="https://www.rust-lang.org"
								className="inline underline"
							>
								<SiRust className="mr-px inline" /> Rust
							</a>{" "}
							and{" "}
							<a
								href="https://iso.org/standard/74528.html"
								className="inline underline"
							>
								<SiC className="mr-px inline" /> C
							</a>
							, although I use other languages as necessary.
						</div>

						<div>
							I also have experience designing both web pages with{" "}
							<a
								href="https://figma.com"
								className="inline underline"
							>
								<SiFigma className="mr-px inline" /> Figma
							</a>{" "}
							and branding icons.
						</div>

						<div>
							I've been previously contracted for a few projects,
							please do reach out if you are interested.
						</div>
					</div>
				</div>
			</div>

			<div className="p-8 flex border-t border-t-neutral-500 flex-col items-center">
				<div className="max-w-screen-lg w-full">
					<div className="text-lg text-celadon-300 font-semibold">
						How can you contact me?
					</div>

					<hr className="w-1/3 my-4 border-white" />

					<div className="flex flex-col gap-2 w-full">
						<span>
							For business inquiries, please reach me at{" "}
							<a
								href="mailto:david@codebycruz.com"
								className="underline"
							>
								david@codebycruz.com
							</a>
						</span>

						<span>
							You can also reach me less formally on{" "}
							<a
								href="https://x.com/codebycruz"
								className="underline"
							>
								𝕏 (@codebycruz)
							</a>
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
