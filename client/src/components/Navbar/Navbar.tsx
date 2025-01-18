import { Link } from "react-router";
import TextDialog from "../Text/TextDialog";
import { Button } from "../shared/button";
import { useSelector } from "react-redux";
import { RootState } from "@/features/store";
import { useLazyLogoutQuery } from "@/features/auth/authSlice";

export default function Navbar() {
	const [triggerLogout, { isLoading }] = useLazyLogoutQuery();
	const user = useSelector((state: RootState) => state.authStore.user)

	return (
		<div className="flex items-center justify-between px-4 py-2 shadow-lg">
			<div className="text-lg font-bold">
				<Link to={"/"}>WSD</Link>
			</div>
			<div className="flex items-center space-x-4">
				<p className="text-lg font-semibold">{user?.email || ''}</p>
				<TextDialog />
				{user ? <div className="flex gap-4">
					<Link to="/my-texts">
						<Button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
							My Texts
						</Button>
					</Link>
					<Button
						onClick={() => triggerLogout({})}
						disabled={isLoading}
						className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
					>
						Logout
					</Button>
				</div> :
					<Link to="/login">
						<Button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
							Login
						</Button>
					</Link>
				}
			</div>
		</div>
	);
}
