import { marked } from "marked";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/atom-one-dark.css";

// Preload only the languages I'm likely to use in the blog
//
// Yes this is ugly. Yes it's terrible.
// You can blame webpack for that: https://github.com/webpack/webpack/issues/13865
//
// prettier-ignore
{
	hljs.registerLanguage("typescript", require('highlight.js/lib/languages/typescript'));
	hljs.registerLanguage("verilog", require('highlight.js/lib/languages/verilog'));
	hljs.registerLanguage("tcl", require('highlight.js/lib/languages/tcl'));
	hljs.registerLanguage("rust", require('highlight.js/lib/languages/rust'));
	hljs.registerLanguage("c", require('highlight.js/lib/languages/c'));
	hljs.registerLanguage("cpp", require('highlight.js/lib/languages/cpp'));
	hljs.registerLanguage("lua", require('highlight.js/lib/languages/lua'));
	hljs.registerLanguage("json", require('highlight.js/lib/languages/json'));
	hljs.registerLanguage("latex", require('highlight.js/lib/languages/latex'));
	hljs.registerLanguage("python", require('highlight.js/lib/languages/python'));
	hljs.registerLanguage("bash", require('highlight.js/lib/languages/bash'));
	hljs.registerLanguage("css", require('highlight.js/lib/languages/css'));
	hljs.registerLanguage("scss", require('highlight.js/lib/languages/scss'));
	hljs.registerLanguage("shell", require('highlight.js/lib/languages/shell'));
	hljs.registerLanguage("nginx", require('highlight.js/lib/languages/nginx'));
	hljs.registerLanguage("x86asm", require('highlight.js/lib/languages/x86asm'));
	hljs.registerLanguage("armasm", require('highlight.js/lib/languages/armasm'));
	hljs.registerLanguage("sql", require('highlight.js/lib/languages/sql'));
	hljs.registerLanguage("xml", require('highlight.js/lib/languages/xml'));
	hljs.registerLanguage("lisp", require('highlight.js/lib/languages/lisp'));
	hljs.registerLanguage("toml", require('highlight.js/lib/languages/ini'));
	hljs.registerLanguage("plaintext", require('highlight.js/lib/languages/plaintext'));
}

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

		blockquote({ tokens }) {
			return `
				<blockquote class="border-l-4 border-neutral-600 pl-4 italic text-neutral-400">
					${this.parser.parse(tokens)}
				</blockquote>
			`;
		},

		codespan({ text }) {
			return `<span
				onclick="navigator.clipboard.writeText('${escapeHtml(text)}')"
				class="bg-neutral-800 px-2 py-1 rounded text-neutral-300 font-mono hover:cursor-pointer"
			>${text}</span>`;
		},

		code({ text, lang, escaped }) {
			const out = hljs.highlight(text, { language: lang ?? "plaintext" });

			return `
				<div class="flex flex-col -z-10 bg-neutral-800 p-2 rounded-lg text-nowrap text-clip w-fit pr-10">
					<button class="text-sm w-fit text-neutral-600 hover:text-neutral-500 hover:cursor-pointer select-none" onclick="navigator.clipboard.writeText('${escapeHtml(text)}')">
						${lang ?? "text"}
					</button>
					<pre><code class="text-wrap font-mono">${out.value}</code></pre>
				</div>
			`;
		},

		paragraph({ tokens }) {
			return `<p class="text-lg">${this.parser.parseInline(tokens)}</p>`;
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
					"text-red-400"
				][depth];

			return `
				<h${depth} class="font-serif font-bold ${color} ${size} ${pad} ${nth_header++ > 0 ? "mt-4" : ""}">
					${this.parser.parseInline(tokens)}
				</h${depth}>
			`;
		},

		link({ tokens, href }) {
			let r = this.parser.parseInline(tokens);
			return `
				<a href=${href} class="text-celadon-400 underline rounded-lg p-px">
					${r}
				</a>
			`;
		},

		list({ items, ordered }) {
			const listType = ordered ? "ol" : "ul";
			const listClass = ordered ? "list-decimal list-outside ml-6" : "list-disc list-outside ml-6";

			const i = items.map(
				(item) => {
					const hasNestedElements = item.tokens.some(token =>
						token.type === 'list' || token.type === 'paragraph' || token.type === 'code'
					);

					if (hasNestedElements) {
						return `<li class="mb-1">${this.parser.parse(item.tokens)}</li>`;
					} else {
						return `<li class="mb-1">${this.parser.parseInline(item.tokens)}</li>`;
					}
				},
			);

			return `<${listType} class="${listClass}">${i.join("")}</${listType}>`;
		},
	},
});

export async function markdownToHTML(md: string) {
	nth_header = 0;
	return await marked.parse(md);
}
