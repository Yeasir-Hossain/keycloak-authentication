import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTextMutation, useGetSingleTextQuery, useUpdateTextMutation } from "@/features/text/textSlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/shared/dialog";
import { Button } from "@/components/shared/button";
import { Textarea } from "@/components/shared/textarea";
import { TextFormData, textSchema } from "@/validations";

interface TextDialogProps {
	edit?: boolean;
	id?: string;
}

export default function TextDialog({ edit = false, id }: TextDialogProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { data: text } = useGetSingleTextQuery(id!, { skip: !edit });
	const [createText, { isLoading: createLoading }] = useCreateTextMutation();
	const [updateText, { isLoading: updateLoading }] = useUpdateTextMutation();

	const form = useForm<TextFormData>({
		resolver: zodResolver(textSchema),
		defaultValues: {
			text: "",
		},
	});

	const { register, handleSubmit, reset, formState: { errors } } = form;

	useEffect(() => {
		if (edit && text) {
			form.reset({
				text: text.text,
			});
		}
	}, [edit, text, form]);

	const onSubmit = async (data: TextFormData) => {
		try {
			if (edit && id) {
				await updateText({ id, text: data.text }).unwrap();
				setIsOpen(false);
			} else {
				await createText(data.text).unwrap();
				setIsOpen(false);
			}
			form.reset();
		} catch (e: any) {
			console.error(e);
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
				<Button>{edit ? 'Update' : 'Add'} Text</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{edit ? 'Update' : 'Add New'} Text</DialogTitle>
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
							<Button type="submit" disabled={createLoading || updateLoading}>
								{(createLoading || updateLoading) ? "Saving..." : "Save"}
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
