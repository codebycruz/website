import Post from "@/components/Post";
import { getPosts, readPost } from "@/lib/blog";
export { getPosts as generateStaticParams };

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
