import connectMongoDB from "../../../libs/mongodb";
import blogModel from "../../../models/BlogModel";
import userModel from "../../../models/UserModel";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await connectMongoDB();
    const blogs = await blogModel.find({});
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectMongoDB();
    const formData = await req.formData();
    const title = formData.get("title");
    const email = formData.get("email");
    const content = formData.get("content");
    const file = formData.get("file");

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const date = new Date();
    const currentDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    let base64Image = null;
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      base64Image = buffer.toString("base64");
    }
    const blog = await blogModel.create({
      title: title,
      author: user.username,
      file: base64Image,
      email: email,
      content: content,
      date_created: currentDate,
    });

    return NextResponse.json(
      { message: "Blog created successfully", blog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await blogModel.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Deletion successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
