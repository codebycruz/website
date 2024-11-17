import { getPosts, readPost } from "@/lib/blog";
import { markdownToHTML } from "@/lib/markdown";
export { getPosts as generateStaticParams };

export async function Post(
	props: Awaited<ReturnType<typeof readPost>> & {
		className?: string;
		innerClassName?: string;
		mdClassName?: string;
	},
) {
	const md = await markdownToHTML(props.content);
	const word_count = props.content.split(" ").length;
	const min_to_read = Math.ceil((1 / 225) * word_count);

	const pub = props.data.published;
	const pubStr = pub
		? pub.toLocaleDateString("en-US", {
				weekday: "long",
				day: "numeric",
				year: "numeric",
				month: "long",
			})
		: "Someday..";

	return (
		<div className={`flex flex-col gap-4 ${props.className}`}>
			<div className="flex flex-row gap-2 justify-between w-full">
				<div className="flex flex-col text-lg">
					<span>By {props.data.author ?? "David Cruz"}</span>
					<span className="text-base text-neutral-300">
						✍️ {pubStr}
					</span>
				</div>

				<span title={`Word Count: ~${word_count}`}>
					~{min_to_read} min read
				</span>
			</div>

			<div
				className={`drop-shadow-sm rounded-lg w-full text-lg p-8 border border-neutral-500 ${props.innerClassName}`}
			>
				<div
					className={props.mdClassName}
					dangerouslySetInnerHTML={{ __html: md }}
				/>
			</div>
		</div>
	);
}

export default async function Blog(props: { params: { id: string } }) {
	const { data, content } = await readPost(`blog/${props.params.id}.md`);

	return (
		<div className="flex flex-col my-12 mx-24 gap-8 items-center min-h-screen">
			<Post data={data} content={content} className="w-full" />
		</div>
	);
}
