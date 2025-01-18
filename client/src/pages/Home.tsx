import { Link } from 'react-router'
import { useDeleteTextMutation, useGetAllTextsQuery } from '@/features/text/textSlice'
import { Card, CardContent } from '@/components/shared/card'
import TextCardLoading from '@/components/skeleton/TextCardLoading'
import { Button } from '@/components/shared/button'
import TextDialog from '@/components/Text/TextDialog'

export default function Home() {
	const { data: texts, isLoading } = useGetAllTextsQuery()
	const [deleteText] = useDeleteTextMutation();

	const handleDelete = async (id: string) => {
		if (window.confirm("Are you sure you want to delete this text?")) {
			try {
				await deleteText(id).unwrap();
				alert("Text deleted successfully.");
			} catch (error) {
				console.error(error);
				alert("Failed to delete text. Please try again.");
			}
		}
	};

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
						<div className="flex gap-2 p-4">
							{/* Edit Button */}
							<TextDialog edit={true} id={text.id} />
							{/* Delete Button */}
							<Button variant="destructive" onClick={() => handleDelete(text.id)}>
								Delete
							</Button>
						</div>
					</Card>
				))}
			</div>
		</div>
	)
}