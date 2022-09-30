/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import jwt from "jsonwebtoken";
import absoluteUrl from "next-absolute-url";
import { sendEmail } from "helpers/sendEmail";

type Data = {
  message: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    if (req.method === "POST") {
      const { email } = req.body;

      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        res.status(404).json({ message: "Email not found" });
      }

      console.log(user);

      const token = jwt.sign(
        { data: { _id: user?.id } },
        process.env.JWT_SECRET || "",
        {
          expiresIn: "30d",
        }
      );

      // console.log(token)y
      let tokenReset = user?.resetToken || "";
      tokenReset = token;

      await prisma.user.create({ data: {} });

      const { origin } = absoluteUrl(req);
      const link = `${origin}/src/user/reset/${token}`;

      const message = `<div>Click on the link below to reset your password, if the link is not working then please paste into the browser.</div></br>
    <div>link:${link}</div>`;

      // console.log("message", message)

      // console.log("here")

      await sendEmail({
        to: user?.email,
        subject: "Password Reset",
        text: message,
      });

      return res.status(200).json({
        message: `Email sent to ${user?.email}, please check your email`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
