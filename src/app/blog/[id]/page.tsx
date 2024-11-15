import matter from "gray-matter";
import { marked } from "marked";

export async function generateStaticParams() {
	const g = new Bun.Glob("./blog/*.md").scan(".");
	const paths = await Array.fromAsync(g);

	return paths.map((p) => ({ id: p.match(/([^/\.]+)\.md/)![1] }));
}

// Hack to only have a gap for subsequent headers
let nth_header = 0;

marked.use({
	renderer: {
		space() {
			return `<br/>`;
		},

		blockquote({ tokens }) {
			return `${this.parser.parseInline(tokens)}`;
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

			return `<h${depth} class="font-serif font-bold ${color} ${size} ${pad} ${nth_header++ > 0 ? "mt-4" : ""}">${this.parser.parseInline(tokens)}</h${depth}>`;
		},

		link({ tokens, href }) {
			let r = this.parser.parseInline(tokens);
			return `<a href=${href} class="text-celadon-400 underline rounded-lg transition p-px duration-500 hover:bg-celadon-400/20">${r}</a>`;
		},

		list({ start, items }) {
			const i = items.map(
				(i) => `<li>${this.parser.parseInline(i.tokens)}</li>`,
			);
			return `<ul class="list-disc list-inside">${i.join("")}</ul>`;
		},
	},
});

export default async function Blog(props: { params: { id: string } }) {
	nth_header = 0;

	const raw = await Bun.file(`./blog/${props.params.id}.md`).text();
	const mat = matter(raw);
	const md = await marked.parse(mat.content);

	const word_count = mat.content.split(" ").length;
	const min_to_read = Math.ceil((1 / 225) * word_count);

	return (
		<div className="flex flex-col my-12 mx-24 gap-8 items-center min-h-screen">
			<div className="flex flex-row gap-2 justify-between w-full">
				<span className="text-lg">
					By {mat.data.author ?? "David Cruz"}
				</span>

				<span title={`Word Count: ~${word_count}`}>
					~{min_to_read} min read
				</span>
			</div>

			<div className="drop-shadow-sm rounded-lg text-lg p-8 border border-neutral-500">
				<div dangerouslySetInnerHTML={{ __html: md }} />
			</div>
		</div>
	);
}
