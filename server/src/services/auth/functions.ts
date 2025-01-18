import { IUser, TokenResponse } from "../../types";

export const getAdminToken = async () => {
	const res = await fetch('http://localhost:8080/realms/master/protocol/openid-connect/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: 'admin-cli',
			username: process.env.KEYCLOAK_ADMIN_USER_NAME!,
			password: process.env.KEYCLOAK_ADMIN_PASSWORD!,
			grant_type: 'password',
		}),
	});
	const adminTokenData = await res.json() as TokenResponse;
	return adminTokenData.access_token;
};

export const searchUser = async (adminToken: string, email: string) => {
	// Get the user ID by searching for the user by email
	const searchResponse = await fetch(
		`${process.env.KEYCLOAK_SERVER_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users?email=${encodeURIComponent(email)}`,
		{
			headers: {
				Authorization: `Bearer ${adminToken}`,
			},
		}
	);

	const users = await searchResponse.json() as IUser[];
	return users[0];
};