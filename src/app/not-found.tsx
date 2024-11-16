export default function NotFound() {
	return (
		<>
			<div className="flex flex-col justify-center items-center gap-4 p-48">
				<div className="text-7xl">⛓️‍💥</div>

				<div className="text-4xl flex flex-col text-center">
					Couldn't find that.
					<a href="/" className="text-blue-400 underline">
						Go home?
					</a>
				</div>
			</div>
		</>
	);
}
