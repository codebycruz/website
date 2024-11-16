import matter from "gray-matter";
import { marked } from "marked";

import hljs from "highlight.js/lib/core";
import "highlight.js/styles/atom-one-dark.css";
import { getPosts, readPost } from "@/lib/blog";

// Preload only the languages I'm likely to use in the blog
//
// Yes this is ugly. Yes it's terrible.
// You can blame webpack for that: https://github.com/webpack/webpack/issues/13865
//
// prettier-ignore
{
	hljs.registerLanguage("typescript", (await import('highlight.js/lib/languages/typescript')).default);
	hljs.registerLanguage("verilog", (await import('highlight.js/lib/languages/verilog')).default);
	hljs.registerLanguage("tcl", (await import('highlight.js/lib/languages/tcl')).default);
	hljs.registerLanguage("rust", (await import('highlight.js/lib/languages/rust')).default);
	hljs.registerLanguage("c", (await import('highlight.js/lib/languages/c')).default);
	hljs.registerLanguage("cpp", (await import('highlight.js/lib/languages/cpp')).default);
	hljs.registerLanguage("lua", (await import('highlight.js/lib/languages/lua')).default);
	hljs.registerLanguage("json", (await import('highlight.js/lib/languages/json')).default);
	hljs.registerLanguage("latex", (await import('highlight.js/lib/languages/latex')).default);
	hljs.registerLanguage("python", (await import('highlight.js/lib/languages/python')).default);
	hljs.registerLanguage("bash", (await import('highlight.js/lib/languages/bash')).default);
	hljs.registerLanguage("css", (await import('highlight.js/lib/languages/css')).default);
	hljs.registerLanguage("scss", (await import('highlight.js/lib/languages/scss')).default);
	hljs.registerLanguage("shell", (await import('highlight.js/lib/languages/shell')).default);
	hljs.registerLanguage("nginx", (await import('highlight.js/lib/languages/nginx')).default);
	hljs.registerLanguage("x86asm", (await import('highlight.js/lib/languages/x86asm')).default);
	hljs.registerLanguage("armasm", (await import('highlight.js/lib/languages/armasm')).default);
	hljs.registerLanguage("sql", (await import('highlight.js/lib/languages/sql')).default);
	hljs.registerLanguage("xml", (await import('highlight.js/lib/languages/xml')).default);
	hljs.registerLanguage("plaintext", (await import('highlight.js/lib/languages/plaintext')).default);
}

export { getPosts as generateStaticParams };

// Hack to only have a gap for subsequent headers
let nth_header = 0;

// Escape to contain inside of an html string.
const escapeHtml = (u: string) => {
	return u
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;")
		.replaceAll("\n", "\\n");
};

marked.use({
	renderer: {
		space() {
			return `<br/>`;
		},

		code({ text, lang, escaped }) {
			const out = hljs.highlight(text, { language: lang ?? "plaintext" });

			return `
				<div class="flex flex-col -z-10 bg-neutral-800 p-2 rounded-lg">
					<button class="text-sm w-fit text-neutral-600 hover:text-neutral-500 hover:cursor-pointer select-none" onclick="navigator.clipboard.writeText('${escapeHtml(text)}')">
						${lang ?? "text"}
					</button>
					<pre><code class="font-mono">${out.value}</code></pre>
				</div>
			`;
		},

		paragraph({ tokens }) {
			return `<p>${this.parser.parseInline(tokens)}</p>`;
		},

		heading({ tokens, depth }) {
			const size = ["", "text-4xl", "text-3xl"][depth] ?? "text-2xl";
			const pad = ["", "mb-6", "mb-4"][depth] ?? "mb-2";
			const color =
				[
					"",
					"text-white",
					"text-blue-400",
					"text-yellow-300",
					"text-red-300",
				][depth] ?? "text-white";

			return `
				<h${depth} class="font-serif font-bold ${color} ${size} ${pad} ${nth_header++ > 0 ? "mt-4" : ""}">
					${this.parser.parseInline(tokens)}
				</h${depth}>
			`;
		},

		link({ tokens, href }) {
			let r = this.parser.parseInline(tokens);
			return `
				<a href=${href} class="text-celadon-400 underline rounded-lg transition p-px duration-500 hover:bg-celadon-400/20">
					${r}
				</a>
			`;
		},

		list({ start, items }) {
			const i = items.map(
				(i) => `<li>${this.parser.parseInline(i.tokens)}</li>`,
			);
			return `<ul class="list-disc list-inside">${i.join("")}</ul>`;
		},
	},
});

export async function Post(
	props: Awaited<ReturnType<typeof readPost>> & {
		className?: string;
		innerClassName?: string;
		mdClassName?: string;
	},
) {
	const md = await marked.parse(props.content);

	const word_count = props.content.split(" ").length;
	const min_to_read = Math.ceil((1 / 225) * word_count);

	const pub = props.data.published;
	const pubStr = pub
		? pub.toLocaleDateString("en-US", {
				weekday: "long",
				day: "numeric",
				year: "numeric",
				month: "long",
			})
		: "Someday..";

	return (
		<div className={`flex flex-col gap-4 ${props.className}`}>
			<div className="flex flex-row gap-2 justify-between w-full">
				<div className="flex flex-col text-lg">
					<span>By {props.data.author ?? "David Cruz"}</span>
					<span className="text-base text-neutral-300">
						✍️ {pubStr}
					</span>
				</div>

				<span title={`Word Count: ~${word_count}`}>
					~{min_to_read} min read
				</span>
			</div>

			<div
				className={`drop-shadow-sm rounded-lg w-full text-lg p-8 border border-neutral-500 ${props.innerClassName}`}
			>
				<div
					className={props.mdClassName}
					dangerouslySetInnerHTML={{ __html: md }}
				/>
			</div>
		</div>
	);
}

export default async function Blog(props: { params: { id: string } }) {
	const { data, content } = await readPost(`blog/${props.params.id}.md`);

	return (
		<div className="flex flex-col my-12 mx-24 gap-8 items-center min-h-screen">
			<Post data={data} content={content} className="w-full" />
		</div>
	);
}
