import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "codebycruz",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
