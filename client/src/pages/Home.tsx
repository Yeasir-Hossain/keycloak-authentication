import { Link } from 'react-router'
import { useGetAllTextsQuery } from '@/features/text/textSlice'
import { Card, CardContent } from '@/components/shared/card'
import TextCardLoading from '@/components/skeleton/TextCardLoading'

export default function Home() {
	const { data: texts, isLoading } = useGetAllTextsQuery()

	if (isLoading) {
		return <TextCardLoading />
	}

	return (
		<div className="py-8">
			<div className="space-y-4">
				{texts?.map((text) => (
					<Card
						key={text.id}
						className="hover:bg-slate-50 cursor-pointer transition-colors"
					>
						<Link to={`/${text.id}`}>
							<CardContent className="pt-6">
								{text.text}
							</CardContent>
						</Link>
					</Card>
				))}
			</div>
		</div>
	)
}