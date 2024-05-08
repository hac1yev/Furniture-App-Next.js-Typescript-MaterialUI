import { connectToDB } from "@/lib/connectToDB";
import { Product } from "@/models/Product";

export async function POST(req: Request) {
    const { image, furniture, price, f_collection, title, description } = await req.json();
    let myNewImage;

    // Convert data URL (base64) to binary
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const binaryData = Buffer.from(base64Data, 'base64');    

    try {
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: `Client-ID 93656fa060b22a7`, // Replace with your Imgur client ID
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: binaryData.toString('base64'),
          type: 'base64',
        }),
      });

      const responseData = await response.json();

      myNewImage = responseData.data.link;

    } catch (error) {
      console.log(error);
    }

    await connectToDB();
    
    const newFurniture = new Product({ image: myNewImage, price, title, description, f_collection, furniture });

    await newFurniture.save();
    await Product.findByIdAndUpdate(newFurniture._id, { $inc: { views: 1 } });

    return Response.json({ message: 'Added' });
};