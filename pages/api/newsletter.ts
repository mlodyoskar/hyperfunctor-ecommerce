import { type NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
	if (req.method !== 'POST') {
		res.status(502).json({ message: `Invalid request method` });
	}

	res.status(200).json({ email: req.body.email });
};

export default handler;
