import Navbar from "@/components/Navbar/Navbar";
import { Outlet } from "react-router";

export default function Client() {
	return (
		<div className="flex flex-col w-full h-full">
			<Navbar />
			<div className="flex-1 container mt-5">
				<Outlet />
			</div>
		</div>
	)
}
