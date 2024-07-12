import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import { getSession } from 'next-auth/react';
//GET /api/properties/:id
export const GET = async (request: any, { params }: any) => {
	try {
		await connectDB();
		const property = await Property.findById(params.id);

		if (!property) {
			return new Response('Property Not Found', {
				status: 404,
			});
		}

		return new Response(JSON.stringify(property), { status: 200 });
	} catch (error) {
		return new Response('Error', { status: 500 });
	}
};

//DELETE /api/properties/:id
export const DELETE = async (request: any, { params }: any) => {
	try {
		const propertyId = params.id;
		const sessionUser = await getSessionUser();
		const userId = sessionUser?.userId;
		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 });
		}
		await connectDB();

		const property = await Property.findById(propertyId);

		if (!property) {
			return new Response('Property Not Found', { status: 404 });
		}

		// Verify ownership
		if (property.owner.toString() !== userId) {
			return new Response('Unauthorized', { status: 401 });
		}
		await property.deleteOne();

		return new Response('Property Deleted', { status: 200 });
	} catch (error) {
		console.log(error);
	}
};

//PUT /api/properties/:id

export const PUT = async (request: any, { params }: any) => {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', { status: 401 });
		}
		const { id } = params;
		const { userId } = sessionUser;

		const formData = await request.formData();

		//Access all values from amenities and images
		const amenities = formData.getAll('amenities');

		//GET property to update
		const existingProperty = await Property.findById(id);

		if (!existingProperty) {
			return new Response('Property does not exist', { status: 404 });
		}

		//Verify ownership
		if (existingProperty.owner.toString() !== userId) {
			return new Response('Unauthorized', { status: 401 });
		}

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
		};

		//Update property in database
		const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

		return new Response(JSON.stringify(updatedProperty), {
			status: 200,
		});
	} catch (error) {
		console.log('error', error);
		return new Response('Failed to add property', { status: 500 });
	}
};
