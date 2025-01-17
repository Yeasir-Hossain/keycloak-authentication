import { Card, CardContent } from '../shared/card'
import { Skeleton } from '../shared/skeleton'

export default function LongestWordLoading() {
	return (
		<Card>
			<CardContent className="pt-6">
				<div className="text-sm text-muted-foreground mb-2">Longest Words</div>
				<div className="space-y-2">
					<Skeleton className="h-4 w-3/4" />
					<Skeleton className="h-4 w-1/2" />
					<Skeleton className="h-4 w-2/3" />
				</div>
			</CardContent>
		</Card>
	)
}
