/**
 * Returns github contributions for the last year.
 */
export async function getGithubContributions() {
	try {
		return (
			await fetch(
				"https://github-contributions-api.jogruber.de/v4/dvvcz?y=last",
			)
		).json() as Promise<{
			total: Record<string, number>;
			contributions: {
				date: string;
				count: number;
				level: 0 | 1 | 2 | 3 | 4;
			}[];
		}>;
	} catch {
		return [];
	}
}
