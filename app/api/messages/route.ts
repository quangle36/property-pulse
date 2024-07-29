import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

//GET /api/messages
export const GET = async () => {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			return new Response(JSON.stringify('User ID is required'), {
				status: 401,
			});
		}

		const { userId } = sessionUser;
		const readMessages = await Message.find({ recipient: userId, read: true })
			.sort({ createdAt: -1 }) //Sort read messages in asc order
			.populate('sender', 'username')
			.populate('property', 'name');
		const unreadMessages = await Message.find({
			recipient: userId,
			read: false,
		})
			.sort({ createdAt: -1 }) //Sort read messages in asc order
			.populate('sender', 'username')
			.populate('property', 'name');
		const messages = [...readMessages, ...unreadMessages];
		return new Response(JSON.stringify(messages), { status: 200 });
	} catch (error) {
		return new Response('Something went wrong', { status: 500 });
	}
};

//POST /api/messages

export const POST = async (request: any) => {
	try {
		await connectDB();

		const { email, phone, message, property, recipient, name } =
			await request.json();

		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.user) {
			return new Response(
				JSON.stringify({ message: 'You must be logged in to send a message' }),
				{ status: 401 }
			);
		}

		const { user } = sessionUser;

		if (user.id === recipient) {
			return new Response(
				JSON.stringify({ message: 'Cannot send a message to yourself' }),
				{ status: 400 }
			);
		}

		const newMessage = new Message({
			sender: user.id,
			recipient,
			property,
			name,
			email,
			phone,
			body: message,
		});

		await newMessage.save();
		return new Response(JSON.stringify({ message: 'Message sent' }), {
			status: 200,
		});
	} catch (error) {
		return new Response('Something went wrong', { status: 500 });
	}
};
