"use client";

import "@glidejs/glide/dist/css/glide.core.min.css";
import Glide, {
	Autoplay,
	Controls,
	Swipe,
} from "@glidejs/glide/dist/glide.modular.esm";

import { FaArrowCircleLeft, FaArrowCircleRight, FaTag } from "react-icons/fa";
import * as Fa from "react-icons/fa";

import { useEffect, useRef } from "react";
import type { ProjectHTML } from "@/lib/projects";

const DynamicIcon = (props: { iconName: string; className?: string }) => {
	const Icon = (Fa as any)[props.iconName];
	if (!Icon) {
		return null; // or return a default icon } return <IconComponent {...props}
	}

	return <Icon className={props.className} />;
};

function EmbeddedCarousel(props: { images: string[]; className?: string }) {
	let r = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const g = new Glide(r.current!, {
			type: "carousel",
			perView: 1,
			autoplay: props.images.length > 1 ? 5000 : false,
		});

		if (props.images.length < 2) {
			g.mount();
		} else {
			g.mount({ Autoplay });
		}

		return () => {
			g.destroy();
		};
	}, []);

	return (
		<div className={props.className} ref={r}>
			<div className="glide__track h-full" data-glide-el="track">
				<ul className="glide__slides h-full">
					{props.images.map((im, i) => (
						<li
							key={i}
							className="glide__slide h-full flex flex-col gap-2"
						>
							<img
								src={im}
								className="h-full rounded-lg object-contain"
								draggable={false}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export function Carousel(props: { projects: ProjectHTML[] }) {
	let r = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const g = new Glide(r.current!, {
			type: "carousel",
			perView: 1,
			autoplay: 30000,
		});

		g.mount({ Autoplay, Swipe, Controls });

		return () => {
			g.destroy();
		};
	}, []);

	return (
		<div className="px-8">
			<div className="w-full relative" ref={r}>
				<div className="glide__track" data-glide-el="track">
					<ul className="glide__slides">
						{props.projects.map((p, i) => (
							<li key={i} className="glide__slide">
								<div className="flex flex-col min-h-[82vh] mt-4 lg:mt-0 items-center lg:flex-row gap-2">
									<EmbeddedCarousel
										images={p.imgs}
										className="w-full rounded-lg lg:w-7/12"
									/>

									<div
										className="w-full lg:w-5/12 select-text rounded-md p-1"
										dangerouslySetInnerHTML={{
											__html: p.html!,
										}}
									/>
								</div>

								<div className="lg:w-full bottom-0 my-4 flex flex-col gap-2 lg:flex-row lg:justify-between">
									<div className="w-fit flex flex-row items-center line-clamp-1 text-sm max-w-screen-sm lg:text-lg text-neutral-200 gap-2 rounded-full bg-neutral-800 p-2 px-4">
										<FaTag className="text-lg inline" />
										{p.tags.join(", ")}
									</div>

									<div className="w-fit flex flex-row items-center text-base lg:text-xl text-neutral-200 gap-4 rounded-full bg-neutral-800 p-2 px-4">
										{p.links.map((l, i) => (
											<a key={i} href={l.href}>
												<DynamicIcon
													iconName={l.icon}
												/>
											</a>
										))}
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>

				<div
					className="glide__arrows flex flex-row justify-evenly"
					data-glide-el="controls"
				>
					<button
						className="glide__arrow glide__arrow--left hidden lg:block absolute h-2/3 px-2 text-5xl lg:text-6xl text-white/20 lg:text-white/30 duration-300 transition hover:text-white/80 -left-7 top-0 lg:top-1/2 -translate-y-1/2"
						data-glide-dir="<"
					>
						<FaArrowCircleLeft />
					</button>

					<button
						className="glide__arrow glide__arrow--right hidden lg:block absolute h-2/3 px-2 text-5xl lg:text-6xl text-white/20 lg:text-white/30 duration-300 transition hover:text-white/80 -right-7 top-0 lg:top-1/2 -translate-y-1/2"
						data-glide-dir=">"
					>
						<FaArrowCircleRight />
					</button>
				</div>
			</div>
		</div>
	);
}
