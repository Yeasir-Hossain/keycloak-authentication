import { ScrollArea, ScrollBar } from "@/components/shared/scroll-area";
import { BrowserRouter } from "react-router";
import AuthProvider from "@/providers/AuthProvider";

export default function Global({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<BrowserRouter>
			<AuthProvider>
				<div className="h-screen overflow-auto antialiased">
					<div className="flex h-screen">
						<div className="h-full flex-1 overflow-y-auto">
							<ScrollArea className="h-full">
								{children}
								<ScrollBar color="#009BF2" />
							</ScrollArea>
						</div>
					</div>
				</div>
			</AuthProvider>
		</BrowserRouter>
	)
}
