import connectDB from '@/config/database';
import Property from '@/models/Property';
import { request } from 'http';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { getSessionUser } from '@/utils/getSessionUser';

//GET /api/properties
export const GET = async (request: any) => {
	try {
		await connectDB();
		const properties = await Property.find({});

		return new Response(JSON.stringify(properties), { status: 200 });
	} catch (error) {
		return new Response('Error', { status: 500 });
	}
};

export const POST = async (request: any) => {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 });
		}
		const formData = await request.formData();

		//Access all values from amenities and images
		const amenities = formData.getAll('amenities');
		const images = formData
			.getAll('images')
			.filter((image: File) => image.name !== '');

		//Create propertyData object for database
		const propertyData = {
			type: formData.get('type'),
			name: formData.get('name'),
			description: formData.get('description'),
			location: {
				street: formData.get('street'),
				city: formData.get('city'),
				state: formData.get('state'),
				zipcode: formData.get('zipcode'),
			},
			beds: formData.get('beds'),
			baths: formData.get('baths'),
			square_feet: formData.get('square_feet'),
			amenities,
			rates: {
				weekly: formData.get('weekly'),
				monthly: formData.get('monthly'),
				nightly: formData.get('nightly'),
			},
			seller_info: {
				name: formData.get('seller_info.name'),
				phone: formData.get('seller_info.phone'),
				email: formData.get('seller_info.email'),
			},
			owner: sessionUser.userId,
			// images,
		};

		const newProperty = new Property(propertyData);
		await newProperty.save();

		return Response.redirect(
			`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
		);
		// return new Response(JSON.stringify({ message: 'Success' }), {
		// 	status: 200,
		// });
	} catch (error) {
		console.log('error', error);
		return new Response('Failed to add property', { status: 500 });
	}
};
