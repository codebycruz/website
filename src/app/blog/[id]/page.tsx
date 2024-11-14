import matter from "gray-matter";
import { marked } from "marked";

export async function generateStaticParams() {
	const g = new Bun.Glob("./blog/*.md").scan(".");
	const paths = await Array.fromAsync(g);

	return paths.map(p => ({ id: p.match(/([^/\.]+)\.md/)![1] }));
}

marked.use({
	renderer: {
		heading({ tokens, depth }) {
			return `<h${depth} class="font-bold text-xl">${this.parser.parseInline(tokens)}</h${depth}>`;
		}
	}
});

export default async function Blog(props: { params: { id: string } }) {
	const raw = await Bun.file(`./blog/${props.params.id}.md`).text();
	const mat = matter(raw);
	const md = await marked.parse(mat.content);

	const word_count = mat.content.split(" ").length;
	const min_to_read = Math.ceil((1 / 225) * word_count);

	return (
		<div>
			<b>Author</b>: {mat.data.author ?? "David Cruz"}&nbsp;
			<b>Published</b>: {mat.data.published.toString() ?? "N/A"}&nbsp;
			~{min_to_read} min read.&nbsp;

			<div dangerouslySetInnerHTML={{ __html: md }} />
		</div>
	)
}
