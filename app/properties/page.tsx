import React from 'react';
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/requests';

const PropertiesPage = async () => {
	const properties = await fetchProperties();
	properties.sort(
		(a: any, b: any) =>
			Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
	);
	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				{properties.length === 0 ? (
					<div>No properties found</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{properties.map((property: any, index: any) => (
							<PropertyCard key={property._id} property={property} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default PropertiesPage;