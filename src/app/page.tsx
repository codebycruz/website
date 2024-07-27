import { SiRust, SiC, SiTypescript, SiGithub, SiTailwindcss, SiReact, SiNextdotjs, SiFigma, SiTwitter } from "react-icons/si";

export default function Home() {
	return (
		<>
			<div className="bg-white flex flex-col items-center px-12 py-36">
				<div className="flex flex-col gap-4">
					<div className="text-celadon-400 transition text-7xl font-semibold">
						Hello!
					</div>

					<div className="text-4xl text-black/30">
						Welcome to my website.
					</div>
				</div>
			</div>

			<div className="bg-van_dyke-600 p-8 text-white flex flex-row gap-8 justify-evenly w-full">
				<div className="flex flex-col gap-2 max-w-sm">
					<div className="text-celadon-400 text-xl font-semibold">
						Who am I?
					</div>

					<div>
						My name is David, I am a <strong> 3rd year Computer Engineering </strong>
						major at <a href="https://www.calpoly.edu" className="underline">🐴 Cal Poly, SLO.</a> I've been heavily involved in the study and community of Computer Science / Software Engineering for over 6 years.
					</div>

					<div>
						I am bilingual, speaking English natively and Spanish lesser so. I'm trying to add Japanese to this list, but we'll see how that goes.
					</div>

					<div>
						I am an Open Source aficionado, I have plenty of experience contributing and creating my own projects on <a href="https://github.com/DvvCz" className="inline underline text-nowrap">
							<SiGithub className="mr-px inline" /> Github
						</a>, as well as managing community issues that come with them.
					</div>
				</div>

				<div className="flex flex-col gap-2 max-w-sm">
					<div className="text-celadon-400 text-xl font-semibold">
						What do I do?
					</div>

					<div>
						I've most recently been honing my skills toward creating front-end, back-end and full-stack web applications using <a href="https://typescriptlang.org" className="inline text-nowrap underline">
							<SiTypescript className="mr-px inline" /> Typescript
						</a>, <a href="https://react.dev" className="inline underline">
							<SiReact className="mr-px inline" /> React
						</a>, <a href="https://tailwindcss.com" className="inline underline text-nowrap">
							<SiTailwindcss className="mr-px inline" /> Tailwind
						</a> and <a href="https://nextjs.org" className="inline underline">
							<SiNextdotjs className="mr-px inline" /> Next.js
						</a> (with experience using other frameworks).
					</div>

					<div>
						I also create native applications, specializing in <a href="https://www.rust-lang.org" className="inline underline">
							<SiRust className="mr-px inline" /> Rust
						</a> and <a href="https://iso.org/standard/74528.html" className="inline underline">
							<SiC className="mr-px inline" /> C
						</a>, although I use other languages as necessary.
					</div>

					<div>
						I also have experience designing both web pages with <a href="https://figma.com" className="inline underline">
							<SiFigma className="mr-px inline" /> Figma
						</a> and branding with various tools.
					</div>
				</div>
			</div>

			<div className="bg-sea_green-400 p-8 text-white">
				<div className="text-lg font-semibold">
					How can you get in contact with me?
				</div>

				<hr className="w-1/3 my-4" />

				<div className="flex flex-col gap-2 w-full">
					<span>
						For business inquiries, please refer to <a href="mailto:codebycruz@gmail.com" className="underline font-medium">
							codebycruz@gmail.com.
						</a>
					</span>

					<span>
						You can also reach me less formally on <a href="https://x.com/codebycruz" className="underline">
							<SiTwitter className="inline" /> (@codebycruz)
						</a>
					</span>
				</div>
			</div>
		</>
	);
}
