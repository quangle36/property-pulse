import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
	mongoose.set('strictQuery', true);

	//If the database is already connected, don't connect again
	if (connected) {
		console.log('Mongodb is already connected...');
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI || '');
		connected = true;
		console.log('Mongodb is connected...');
	} catch (error) {
		console.log('Mongodb connection failed...', error);
	}
};
export default connectDB;
