export default function NotFound() {
	return (
		<>
			<div className="bg-white flex flex-col justify-center items-center gap-4 p-44">
				<div className="text-neutral-500 text-7xl">
					u-u
				</div>

				<div className="text-neutral-400 text-4xl flex flex-col text-center">
					Couldn't find that.
					<a href="/" className="text-blue-400 underline">Go home?</a>
				</div>
			</div>
		</>
	)
}