import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "lib/prisma";
import { toast } from "react-toastify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  const userByUsername = await prisma.user.findUnique({
    where: { username: body.username },
  });

  if (userByUsername) {
    console.log("Username already exist");
    return;
  }

  if (
    body.first_name === null ||
    body.first_name === undefined ||
    body.first_name === ""
  ) {
    console.log("First name is missing");
    return;
  }

  if (
    body.last_name === null ||
    body.last_name === undefined ||
    body.last_name === ""
  ) {
    console.log("Last name is missing");
    return;
  }

  if (
    body.username === null ||
    body.username === undefined ||
    body.username === ""
  ) {
    console.log("Username is missing");
    return;
  }

  if (body.email === null || body.email === undefined || body.email === "") {
    console.log("email is missing");
    return;
  }

  if (
    body.password === null ||
    body.password === undefined ||
    body.password === ""
  ) {
    console.log("password is missing");
    return;
  }

  if (user) {
    res.status(422).json({ message: "User already exists" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(body.password, salt);
  await prisma.user.create({
    data: {
      first_name: body.first_name,
      last_name: body.last_name,
      name: body.first_name + " " + body.last_name,
      username: body.username,
      email: body.email,
      password: hash,
    },
  });

  return res.status(200).json({ message: "User registered successfully" });
}
