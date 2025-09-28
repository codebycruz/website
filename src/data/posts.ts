type MdPostFrontMatter = {
	published: string;
	timeToRead: number;
	title: string;
	desc: string;
	tags: string[];
};

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

				return {
					filename,
					link: `/posts/${filename}`,
					content: await post.compiledContent(),
					...post.frontmatter,
				};
			},
		),
	);
}

export async function getAllProjects() {
	return (await Promise.all(
		Object.entries(import.meta.glob("../pages/projects/*.astro")).map(
			async ([path, loader]) => {
				const post = await loader();
				const filename =
					path.split("/").pop()?.replace(".astro", "") || "";

				return {
					filename,
					// @ts-expect-error
					...post,
				};
			},
		),
	)) as {
		filename: string;
		name: string;
		desc: string;
		tags: string[];
		order: number;
		cover?: string;
		coverStyle?: string;
		link?: string;
		stars?: number;
		stealth?: boolean;
		status?: "Hiatus" | "Complete" | "Ongoing";
	}[];
}
