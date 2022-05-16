import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../app/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  const user = await prisma.user.findMany({
    where: {
      email: session?.user?.email,
    },
  });

  const portfolio =
    user &&
    (await prisma.portfolio.findMany({
      where: {
        userId: user[0].id,
      },
    }));

  const coins =
    portfolio &&
    portfolio.length > 0 &&
    (await prisma.coin.findMany({
      where: {
        portfolioId: portfolio[0].id,
      },
    }));

  const result = {
    user: user ? user[0] : "",
    portfolio: portfolio,
    coins: coins,
  };

  res.json(result);
}
