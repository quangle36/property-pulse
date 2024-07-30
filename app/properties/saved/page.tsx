'use client';
import React, { useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const SavedProperty = () => {
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSavedProperties = async () => {
			try {
				const res = await fetch('/api/bookmark');
				if (res.status === 200) {
					const data = await res.json();
					setProperties(data);
				} else {
					console.log(res.statusText);
					toast.error('Failed to fetch saved properties');
				}
			} catch (error) {
				console.log(error);
				toast.error('Failed to fetch saved properties');
			} finally {
				setLoading(false);
			}
		};
		fetchSavedProperties();
	}, []);

	return loading ? (
		<Spinner loading={loading} />
	) : (
		<section className="px-4 py-6">
			<h1>Saved Properties</h1>
			<div className="container-xl lg:container m-auto px-4 py-6">
				{properties?.length === 0 ? (
					<div>No saved properties</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{properties?.map((property: any, index: any) => (
							<PropertyCard key={property._id} property={property} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default SavedProperty;
