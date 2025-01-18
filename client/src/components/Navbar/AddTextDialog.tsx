import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTextMutation } from "@/features/text/textSlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/shared/dialog";
import { Button } from "@/components/shared/button";
import { Textarea } from "@/components/shared/textarea";
import { TextFormData, textSchema } from "@/validations";

export default function AddTextDialog() {
	const [createText, { isLoading }] = useCreateTextMutation();
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm<TextFormData>({
		resolver: zodResolver(textSchema),
		defaultValues: {
			text: "",
		},
	});

	const { register, handleSubmit, reset, formState: { errors } } = form;

	// Handle form submission
	const onSubmit: SubmitHandler<TextFormData> = async (data) => {
		try {
			await createText(data.text).unwrap();
			reset();
			setIsOpen(false);
		} catch (error) {
			console.error(error);
			alert("Failed to add text. Please try again.");
		}
	};

	const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		reset();
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>Add Text</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Text</DialogTitle>
				</DialogHeader>
				<FormProvider {...form}>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<Textarea
							{...register("text")}
							placeholder="Enter your text here..."
							rows={6}
							className="w-full"
						/>
						{errors.text?.message && (
							<p className="text-red-500 text-sm">{errors.text.message}</p>
						)}
						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading ? "Saving..." : "Save"}
							</Button>
							<Button
								variant="secondary"
								onClick={handleCancel}
							>
								Cancel
							</Button>
						</DialogFooter>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
}
