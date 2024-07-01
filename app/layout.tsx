import React from 'react';
import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
export const metadata = {
	title: 'PropertyPulse | Find The Perfect Rental',
	description:
		'Find the perfect rental property with PropertyPulse. Search for apartments, houses, condos, and more. Compare prices, amenities, and more.',
	keywords: 'rental, property, apartment, house, condo, rent, lease',
};
const MainLayout = ({ children }: { children: JSX.Element }) => {
	return (
		<AuthProvider>
			<html lang="en">
				<body>
					<Navbar />
					<div>{children}</div>
					<Footer />
				</body>
			</html>
		</AuthProvider>
	);
};

export default MainLayout;
