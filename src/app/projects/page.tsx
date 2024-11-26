import { getProjects } from "@/lib/projects";
import { Carousel } from "./carousel";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projects",
};

export default async function Projects() {
	return <Carousel projects={await getProjects()} />;
}
