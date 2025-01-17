import { Skeleton } from "../shared/skeleton";

export default function TextCardLoading() {
	return (
		<div className="space-y-4">
			{[1, 2, 3].map((i) => (
				<Skeleton key={i} className="h-20 w-full" />
			))}
		</div>
	)
}