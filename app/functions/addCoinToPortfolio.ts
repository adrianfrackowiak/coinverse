export const addCoinToPortfolio = async (
  e: React.SyntheticEvent,
  selectedCoin: string,
  quantity: number,
  pricePerCoin: number
) => {
  e.preventDefault();
  try {
    const body = { selectedCoin, quantity, pricePerCoin };
    await fetch("/api/portfolio/coin/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
};
