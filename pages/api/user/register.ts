import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "lib/prisma";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (user) {
    res.status(422).json({ message: "User already exists" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(body.password, salt);
  await prisma.user.create({
    data: { email: body.email, password: hash },
  });

  res.status(200).json({ message: "User registered successfully" });
}
