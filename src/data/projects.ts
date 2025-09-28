export type ProjectFrontMatter = {
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
};

export async function getAllProjects() {
	return await Promise.all(
		Object.entries(import.meta.glob("../pages/projects/*.astro")).map(
			async ([path, loader]) => {
				const post = (await loader()) as ProjectFrontMatter;
				const filename =
					path.split("/").pop()?.replace(".astro", "") || "";

				return {
					filename,
					...post,
					link: post.link ? post.link : `/projects/${filename}`,
				};
			},
		),
	);
}
