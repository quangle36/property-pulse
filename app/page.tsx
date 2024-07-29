import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';
import connectDB from '@/config/database';
import FeaturedProperties from '@/components/FeaturedProperties';
const HomePage = async () => {
	return (
		<div>
			<Hero />
			<InfoBoxes />
			<FeaturedProperties />
			<HomeProperties />
		</div>
	);
};

export default HomePage;
