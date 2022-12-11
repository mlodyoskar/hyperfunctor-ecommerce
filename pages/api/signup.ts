import {
	CreateAccountMutation,
	CreateAccountMutationVariables,
	CreateAccountDocument,
} from './../../generated/graphql';
import { NextApiHandler } from 'next';
import { SignUpFormSchema } from '../signup';
import * as bcrypt from 'bcrypt';
import { authorizedApolloClient } from '../../graphql/authorizedClient';

const SignUpHandler: NextApiHandler = async (req, res) => {
	const { email, password } = await SignUpFormSchema.omit(['passwordConfirmation']).validate(req.body);

	const passwordHash = await bcrypt.hash(password, 12);
	//TODO: Handle situatiojn when user signups with the same email
	const user = await authorizedApolloClient.mutate<CreateAccountMutation, CreateAccountMutationVariables>({
		mutation: CreateAccountDocument,
		variables: {
			email,
			password: passwordHash,
		},
	});

	res.status(201).json({ userId: user.data?.createAccount?.id });
};

export default SignUpHandler;
