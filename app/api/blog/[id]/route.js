import connectMongoDB from "../../../../libs/mongodb";
import blogModel from "../../../../models/BlogModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    await connectMongoDB();
    const blog = await blogModel.findOne({ _id: id });
    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
export async function PATCH(req, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;
    const { title, content } = await req.json();
    await blogModel.findByIdAndUpdate(id, { title, content });
    return NextResponse.json(
      { message: "Updation Successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
