import { invariant } from '@apollo/client/utilities/globals';
import {
	GetAccountByEmailQuery,
	GetAccountByEmailQueryVariables,
	GetAccountByEmailDocument,
} from './../../../generated/graphql';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { authorizedApolloClient } from '../../../graphql/authorizedClient';
import { compare } from 'bcrypt';

const NEXT_AUTH_SECRET = process.env.NEXT_AUTH_SECRET;
invariant(NEXT_AUTH_SECRET);

export const authOptions: NextAuthOptions = {
	providers: [
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
