import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../app/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { newPortfolioName } = req.body;

  const session = await getSession({ req });
  const user = await prisma.user.findMany({
    where: {
      email: session?.user?.email,
    },
  });

  const result = await prisma.portfolio.create({
    data: {
      userId: user[0].id,
      name: newPortfolioName,
    },
  });
  res.json(result);
}
