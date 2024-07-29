import React from 'react';
import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { GlobalProvider } from '@/context/GlobalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'photoswipe/photoswipe.css';
export const metadata = {
	title: 'PropertyPulse | Find The Perfect Rental',
	description:
		'Find the perfect rental property with PropertyPulse. Search for apartments, houses, condos, and more. Compare prices, amenities, and more.',
	keywords: 'rental, property, apartment, house, condo, rent, lease',
};
const MainLayout = ({ children }: { children: JSX.Element }) => {
	return (
		<GlobalProvider>
			<AuthProvider>
				<html lang="en">
					<body>
						<Navbar />
						<div>{children}</div>
						<Footer />
						<ToastContainer />
					</body>
				</html>
			</AuthProvider>
		</GlobalProvider>
	);
};

export default MainLayout;
