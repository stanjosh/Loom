
import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect(import.meta.env.MONGO_URI);

export default connectMongo;