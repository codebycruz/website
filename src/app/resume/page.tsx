import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Resume",
};

export default function Resume() {
	return (
		<>
			<div className="h-screen">
				<embed src="Resume.pdf" className="w-full h-full" />
			</div>
		</>
	);
}
