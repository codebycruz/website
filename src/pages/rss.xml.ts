import rss, { type RSSFeedItem } from "@astrojs/rss";
import { email } from "../data/info";
import { getAllPosts } from "../data/posts";

export async function GET(context: { site: string | URL }) {
	const posts = await getAllPosts();

	return rss({
		title: "codebycruz",
		description: "Posts from the codebycruz website",
		site: context.site,
		items: posts.map(
			(item) =>
				({
					link: item.link,
					author: email,
					description: item.desc,
					pubDate: new Date(item.published),
					title: item.title,
					categories: item.tags,
					content: item.content,
				}) as RSSFeedItem,
		),
		customData: `<language>en-us</language>`,
	});
}
