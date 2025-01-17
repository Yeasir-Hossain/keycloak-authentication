import session from 'express-session';
import Keycloak, { KeycloakConfig } from 'keycloak-connect';

const config: KeycloakConfig = {
	"realm": "wsd",
	"ssl-required": "none",
	"auth-server-url": "http://localhost:8080/",
	"confidential-port": 0,
	"resource": "myClient",
};

export const memoryStore = new session.MemoryStore();
export const keycloak = new Keycloak({ store: memoryStore }, config);