import { Card, CardContent } from "@/components/shared/card";
import { Skeleton } from "@/components/shared/skeleton";

interface StatCardProps {
	title: string;
	value: number | undefined;
	isLoading: boolean;
}

export default function StatCard({ title, value, isLoading }: StatCardProps) {
	return (
		<Card className="flex-1">
			<CardContent className="pt-6">
				<div className="text-sm text-muted-foreground mb-2">{title}</div>
				{isLoading ? (
					<Skeleton className="h-8 w-20" />
				) : (
					<div className="text-2xl font-bold">{value}</div>
				)}
			</CardContent>
		</Card>
	)
}