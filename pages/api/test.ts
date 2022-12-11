import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
	console.log(req.body);
	res.status(200).json({ message: 'Elo' });
};

export default handler;
