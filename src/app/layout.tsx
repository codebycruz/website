import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: {
		template: "%s | codebycruz",
		default: "codebycruz",
	},
	description:
		"David Cruz's website. Projects, articles, and my resume can be found here.",
	keywords: [
		"articles",
		"blog",
		"nextjs",
		"codebycruz",
		"cruz",
		"react",
		"tailwindcss",
		"rust",
		"student",
		"fpga",
		"software",
	],
	openGraph: {
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="bg-van_dyke-200 text-white">
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
