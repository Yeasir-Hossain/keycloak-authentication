import { Card, CardContent } from "@/components/shared/card";
import LongestWordLoading from "@/components/skeleton/LongestWordLoading";

interface LongestWordsProps {
	words: string[] | undefined;
	isLoading: boolean;
}
export default function LongestWords({ words, isLoading }: LongestWordsProps) {
	if (isLoading) {
		return <LongestWordLoading />;
	}

	return (
		<Card>
			<CardContent className="pt-6">
				<div className="text-sm text-muted-foreground mb-2">Longest Words</div>
				<div className="flex flex-wrap gap-2">
					{words?.map((word, index) => (
						<span key={index} className="bg-slate-100 px-2 py-1 rounded">
							{word}
						</span>
					))}
				</div>
			</CardContent>
		</Card>
	)
}