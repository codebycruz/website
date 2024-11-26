import matter from "gray-matter";

// Fetch all of the blog files
const GLOB = new Bun.Glob("blog/*.md");

// Get the identifier part of a post path
const ID = /([^/\.]+)\.md/;

export async function getPosts() {
	const paths = await Array.fromAsync(GLOB.scan("."));
	return paths.map((p) => ({ path: p, id: p.match(ID)![1] }));
}

type Metadata = { author?: string; published?: Date; title?: string };

export async function readPost(
	path: string,
): Promise<{ content: string; data: Metadata }> {
	const raw = await Bun.file(path).text();

	const meta = matter(raw);
	return { content: meta.content, data: meta.data };
}

const WPM = 225;

export function minToRead(text: string) {
	const word_count = text.split(" ").length;
	return { word_count, minutes: Math.ceil((1 / WPM) * word_count) };
}
