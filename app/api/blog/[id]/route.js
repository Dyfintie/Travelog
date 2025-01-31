import connectMongoDB from "../../../../libs/mongodb";
import blogModel from "../../../../models/BlogModel";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  await connectMongoDB();
  const blog = await blogModel.findOne({ _id: id });
  return NextResponse.json({ blog }, { status: 200 });
}
export async function PATCH(req, { params }) {
  const { id } = params;
  const { title, content } = await req.json();
  await connectMongoDB();
  await blogModel.findByIdAndUpdate(id, { title, content });
  return NextResponse.json({ message: "Updation Successful" }, { status: 200 });
}
