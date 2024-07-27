export default function Footer() {
	return (
		<div className="bg-celadon-100 flex flex-col items-center w-full p-8">
			<div className="text-white text-md">
				© { new Date().getFullYear() } David Cruz
			</div>
		</div>
	)
}