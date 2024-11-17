"use server";

import { getProjects } from "@/lib/projects";
import { Carousel } from "./carousel";

export default async function Projects() {
	return <Carousel projects={await getProjects()} />;
}
