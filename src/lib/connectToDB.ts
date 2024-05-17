import mongoose from "mongoose";

interface ConnectionStatus {
    isConnected: any;
}

export const connectToDB = async () => {
    const connection: ConnectionStatus = { isConnected: false };
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Adjust the timeout as needed
      };
    try {
        if(connection.isConnected) return;
        const db = await mongoose.connect("mongodb+srv://hac1yev:rUKN56aPP4z9C06i@cluster0.iniiaiz.mongodb.net/furniture?retryWrites=true&w=majority&appName=Cluster0" as string, options);
        connection.isConnected = db.connections[0].readyState;

    } catch (error: any) {
        throw new Error(error);
    }
};