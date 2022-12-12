import { invariant } from '@apollo/client/utilities/globals';
import {
	GetAccountByEmailQuery,
	GetAccountByEmailQueryVariables,
	GetAccountByEmailDocument,
} from './../../../generated/graphql';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Auth0Provider from 'next-auth/providers/auth0';
import { authorizedApolloClient } from '../../../graphql/authorizedClient';
import { compare } from 'bcrypt';

const NEXT_AUTH_SECRET = process.env.NEXT_AUTH_SECRET;
// const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
// const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
// const AUTH0_ISSUER = process.env.AUTH0_ISSUER;

invariant(NEXT_AUTH_SECRET);
// invariant(AUTH0_CLIENT_ID);
// invariant(AUTH0_CLIENT_SECRET);
// invariant(AUTH0_ISSUER);

export const authOptions: NextAuthOptions = {
	providers: [
		// Auth0Provider({
		// 	clientId: AUTH0_CLIENT_ID,
		// 	clientSecret: AUTH0_CLIENT_SECRET,
		// 	issuer: AUTH0_ISSUER,
		// }),
		CredentialsProvider({
			name: 'Logowanie z hasłem',
			credentials: {
				username: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
				password: { label: 'Hasło', type: 'password' },
			},

			async authorize(credentials, req) {
				if (!credentials) {
					return null;
				}

				const user = await authorizedApolloClient.query<GetAccountByEmailQuery, GetAccountByEmailQueryVariables>({
					query: GetAccountByEmailDocument,
					variables: { email: credentials.username },
				});

				if (!user.data.account) {
					return null;
				}
				const arePasswordsEqual = await compare(credentials.password, user.data.account.password);
				if (!arePasswordsEqual) {
					return null;
				}

				return {
					id: user.data.account.id,
					email: user.data.account.email,
				};
			},
		}),
	],
	debug: process.env.NODE_ENV === 'development',
	secret: NEXT_AUTH_SECRET,
};
export default NextAuth(authOptions);
