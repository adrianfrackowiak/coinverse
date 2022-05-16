import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../../app/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { selectedCoin, quantity, pricePerCoin } = req.body;

  const session = await getSession({ req });
  const user = await prisma.user.findMany({
    where: {
      email: session?.user?.email,
    },
  });

  const portfolio = await prisma.portfolio.findMany({
    where: {
      userId: user[0].id,
    },
  });

  const result = await prisma.coin.create({
    data: {
      portfolioId: portfolio[0].id,
      name: selectedCoin,
      holdings: quantity,
      buyPrice: pricePerCoin,
    },
  });

  res.json(result);
}
