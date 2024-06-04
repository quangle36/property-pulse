import React from 'react';
import '@/assets/styles/globals.css';

export const metadata = {
	title: 'PropertyPulse | Find The Perfect Rental',
	description:
		'Find the perfect rental property with PropertyPulse. Search for apartments, houses, condos, and more. Compare prices, amenities, and more.',
	keywords: 'rental, property, apartment, house, condo, rent, lease',
};
const MainLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<div>{children}</div>
			</body>
		</html>
	);
};

export default MainLayout;
