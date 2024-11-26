import { minToRead } from "@/lib/blog";
import { markdownToHTML } from "@/lib/markdown";

export default async function Post(props: {
	markdown: string;
	published?: Date;
	author?: string;

	className?: string;
	innerClassName?: string;
	mdClassName?: string;
}) {
	const md = await markdownToHTML(props.markdown);
	const { word_count, minutes } = minToRead(props.markdown);

	const pub = props.published;
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
					<span>By {props.author ?? "David Cruz"}</span>
					<span className="text-base text-neutral-300">
						✍️ {pubStr}
					</span>
				</div>

				<span title={`Word Count: ~${word_count}`}>
					~{minutes} min read
				</span>
			</div>

			<div
				className={`drop-shadow-xs rounded-lg w-full text-lg p-8 border border-neutral-500 ${props.innerClassName}`}
			>
				<div
					className={props.mdClassName}
					dangerouslySetInnerHTML={{ __html: md }}
				/>
			</div>
		</div>
	);
}
