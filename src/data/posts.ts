export type MdPostFrontMatter = {
	published: string;
	title: string;
	desc: string;
	tags: string[];
	preview?: string;
};

export type MdPostProps = {
	frontmatter: MdPostFrontMatter;
	rawContent: () => Promise<string>;
	compiledContent: () => Promise<string>;
};

export function calculatePostMinutesToRead(mdContent: string) {
	return Math.ceil(mdContent.length / 5 /* word */ / 220 /* wpm */);
}

export async function getAllPosts() {
	return await Promise.all(
		Object.entries(import.meta.glob("../pages/posts/*.md")).map(
			async ([path, loader]) => {
				const post = (await loader()) as {
					frontmatter: MdPostFrontMatter;

					/// Markdown content
					rawContent: () => Promise<string>;

					/// HTML content
					compiledContent: () => Promise<string>;
				};

				const filename =
					path.split("/").pop()?.replace(".md", "") || "";

				const mdContent = await post.rawContent();
				const htmlContent = await post.compiledContent();

				return {
					filename,
					link: `/posts/${filename}`,
					minutesToRead: calculatePostMinutesToRead(mdContent),
					content: htmlContent,
					...post.frontmatter,
				};
			},
		),
	);
}
