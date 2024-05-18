import mongoose from "mongoose";

interface ConnectionStatus {
    isConnected: any;
}

export const connectToDB = async () => {
    const connection: ConnectionStatus = { isConnected: false };

    try {
        if(connection.isConnected) return;
        const db = await mongoose.connect(process.env.DATABASE_URI as string);
        connection.isConnected = db.connections[0].readyState;

    } catch (error: any) {
        throw new Error(error);
    }
};