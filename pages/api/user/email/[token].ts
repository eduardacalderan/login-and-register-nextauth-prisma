// /* eslint-disable import/no-anonymous-default-export */
// import type { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import absoluteUrl from "next-absolute-url";
// import prisma from "lib/prisma";

// type Data = {
//   message: string;
// };

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     if (req.method === "PUT") {
//       const { token } = req.query;

//       console.log(token);

//       if (token) {
//         const decoded = jwt.verify(
//           token as string,
//           process.env.JWT_SECRET || ""
//         );
//         let userDecoded = req.body.user
//         userDecoded = decoded;
//       }

//       if (!token) {
//         return res.status(200).json({ message: "no Token" });
//       }

//       const user = await prisma.user.findUnique({
//         where: { email: req.body },
//       });

//       if (user) {
//         prisma.user.emailVerified = "yes";
//         prisma.user.emailToken = undefined || '';
//         await user.save();

//         return res.status(200).json({ message: "success in updating user" });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
