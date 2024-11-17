import { Post } from "./[id]/page";
import { getPosts, readPost } from "@/lib/blog";

const PATHS = await getPosts();
const POSTS = await Promise.all(
	PATHS.map(async (p) => ({
		path: p.path,
		id: p.id,
		post: await readPost(p.path),
	})),
);

const SORTED_POSTS = POSTS.toSorted(
	(a, b) =>
		(a.post.data.published ?? new Date()).getTime() -
		(b.post.data.published ?? new Date()).getTime(),
);

export default async function Blog() {
	return (
		<div className="p-8 flex flex-col">
			<span className="text-center text-5xl font-medium font-sans mb-2">
				All Articles
			</span>
			<span className="text-center text-neutral-400 text-2xl font-medium font-serif mb-14">
				{`As of ${new Date().toLocaleDateString()}`}
			</span>
			<div className="flex flex-col gap-16">
				{SORTED_POSTS.map((p, i) => (
					<div key={i} className="relative">
						<Post
							markdown={p.post.content}
							published={p.post.data.published}
							author={p.post.data.author}
							className="rounded-lg p-8"
							mdClassName="max-h-56 overflow-hidden"
						/>

						{/* Have anchor alongside Post, to avoid nested anchors which aren't allowed. */}
						<a
							href={`/blog/${p.id}`}
							className="absolute top-0 rounded-lg duration-500 transition hover:bg-neutral-800/30 size-full"
						/>
					</div>
				))}
			</div>

			<span className="text-lg text-center my-12">More soon..</span>
		</div>
	);
}
