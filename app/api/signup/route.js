import connectMongoDB from "../../../libs/mongodb.js";
import userModel from "../../../models/UserModel";
import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import crypto from "crypto";
export async function POST(req) {
  const { username, email, password } = await req.json();
  await connectMongoDB();
  const exist = await userModel.find({ email: email });
  if (!exist.empty()) {
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
  // bcrypt.genSalt(10, (err, hash)=>{
  //     let user = await userModel.create({
  //         username,
  //         email,
  //         password:hash,
  //     })
  // });
}
