import { type NextApiHandler } from 'next';

const BASE_API_URL = 'https://connect.mailerlite.com/api';

const APIKEY = process.env.MAILERLITE_APIKEY;
const GROUP_ID = process.env.MAILERLITE_GROUP_ID;

if (!APIKEY || !GROUP_ID) {
	throw new Error('MAILERLITE_APIKEY or GROUP_ID was not provided');
}

const handler: NextApiHandler = async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(502).json({ message: `Invalid request method` });
	}

	if (!req.body.email) {
		return res.status(400).json({ message: `Email is required` });
	}
	try {
		const response = await fetch(`https://api.mailerlite.com/api/v2/groups/${GROUP_ID}/subscribers`, {
			method: 'POST',
			headers: {
				'X-MailerLite-ApiKey': `${APIKEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: req.body.email }),
		});

		if (response.status >= 400) {
			return res.status(400).json({
				error: `Error occured, contact us`,
			});
		}

		res.status(201).json({ error: '' });
	} catch (error) {
		res.status(500).json({ error: error });
	}
};

export default handler;
