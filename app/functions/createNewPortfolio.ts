export const createNewPortfolio = async (
  e: React.SyntheticEvent,
  newPortfolioName: string
) => {
  e.preventDefault();
  try {
    const body = { newPortfolioName };
    await fetch("/api/portfolio/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error(error);
  }
};
