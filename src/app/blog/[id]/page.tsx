import Post from "@/components/Post";
import { getPosts, minToRead, readPost } from "@/lib/blog";
import type { Metadata } from "next";
export { getPosts as generateStaticParams };

export async function generateMetadata(props: {
	params: { id: string };
}): Promise<Metadata> {
	const { data, content } = await readPost(`blog/${props.params.id}.md`);
	const { minutes } = minToRead(content);

	return {
		title: data.title ?? "No Title",
		description: `Published ${data.published?.toLocaleDateString()} by ${data.author ?? "No Author"}`,

		openGraph: {
			type: "article",
			title: `${data.title ?? "No Title"} | ${minutes} minute read.`,
		},
	};
}

export default async function Blog(props: { params: { id: string } }) {
	const { data, content } = await readPost(`blog/${props.params.id}.md`);

	return (
		<div className="flex flex-col my-12 mx-24 gap-8 items-center min-h-screen">
			<Post
				markdown={content}
				published={data.published}
				author={data.author}
				className="w-full"
			/>
		</div>
	);
}
