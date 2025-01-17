import { useParams } from 'react-router'
import { Card, CardContent } from '@/components/shared/card'
import { Skeleton } from '@/components/shared/skeleton'
import {
	useGetSingleTextQuery,
	useGetWordCountQuery,
	useGetCharacterCountQuery,
	useGetSentenceCountQuery,
	useGetParagraphCountQuery,
	useGetLongestWordsQuery
} from '@/features/text/textSlice'
import StatCard from './StatCard'
import LongestWords from './LongestWords'

export default function Text() {
	const { id } = useParams()

	const { data: textData, isLoading: isTextLoading } = useGetSingleTextQuery(id!)
	const { data: { wordCount } = { wordCount: 0 }, isLoading: isWordCountLoading } = useGetWordCountQuery(id)
	const { data: { characterCount } = { characterCount: 0 }, isLoading: isCharCountLoading } = useGetCharacterCountQuery(id)
	const { data: { sentenceCount } = { sentenceCount: 0 }, isLoading: isSentenceCountLoading } = useGetSentenceCountQuery(id)
	const { data: { paragraphCount } = { paragraphCount: 0 }, isLoading: isParagraphCountLoading } = useGetParagraphCountQuery(id)
	const { data: { longestWords } = { longestWords: [] }, isLoading: isLongestWordsLoading } = useGetLongestWordsQuery(id)

	return (
		<div className="py-8 space-y-6">
			<Card>
				<CardContent className="pt-6">
					{isTextLoading ? (
						<div className="space-y-4">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-3/4" />
							<Skeleton className="h-4 w-5/6" />
						</div>
					) : (
						<div className="text-lg">{textData?.text}</div>
					)}
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<StatCard
					title="Word Count"
					value={wordCount}
					isLoading={isWordCountLoading}
				/>
				<StatCard
					title="Character Count"
					value={characterCount}
					isLoading={isCharCountLoading}
				/>
				<StatCard
					title="Sentence Count"
					value={sentenceCount}
					isLoading={isSentenceCountLoading}
				/>
				<StatCard
					title="Paragraph Count"
					value={paragraphCount}
					isLoading={isParagraphCountLoading}
				/>
			</div>

			<LongestWords
				words={longestWords}
				isLoading={isLongestWordsLoading}
			/>
		</div>
	)
}