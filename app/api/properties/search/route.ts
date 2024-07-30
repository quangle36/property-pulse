import connectDB from '@/config/database';
import Property from '@/models/Property';
export const dynamic = 'force-dynamic';
//GET /api/properties/search
export const GET = async (request: any) => {
	try {
		await connectDB();
		const url = request.url;
		const { searchParams } = new URL(url);
		const location = searchParams.get('location') as string;
		const propertyType = searchParams.get('propertyType');

		const locationPattern = new RegExp(location, 'i');

		let query = {
			$or: [
				{ name: locationPattern },
				{ description: locationPattern },
				{ 'location.street': locationPattern },
				{ 'location.city': locationPattern },
				{ 'location.state': locationPattern },
				{ 'location.zipcode': locationPattern },
			],
		} as any;

		//Only check for property if it not 'All'
		if (propertyType && propertyType != 'All') {
			const typePattern = new RegExp(propertyType, 'i');
			query.name = typePattern;
		}

		const properties = await Property.find(query);

		return new Response(JSON.stringify(properties), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: 'Something went wrong' }), {
			status: 500,
		});
	}
};
