import connectMongoDB from "../../../libs/mongodb.js";
import userModel from "../../../models/UserModel";
import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import crypto from "crypto";
export async function POST(req) {
  await connectMongoDB();
  const { username, email, password } = await req.json();
  const exist = await userModel.findOne({email});
  if (exist) {
    console.log(exist);
    return NextResponse.json(
      { message: "User already exists" },
      { status: 401 }
    );
  }
  await userModel.create({ username, email, password });
  return NextResponse.json(
    { message: "User created successfully" },
    { status: 200 }
  );
}
