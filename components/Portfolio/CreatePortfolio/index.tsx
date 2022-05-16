import { Text, Container } from "@chakra-ui/react";
import { AddNewPortfolioModal } from "../AddNewPortfolioModal";

export const CreatePortfolio = () => {
  return (
    <Container
      maxW="1400px"
      display="flex"
      h="full"
      flexDir="column"
      alignItems="start"
      py={10}
    >
      <Text as="h2" fontSize="2rem" fontWeight={700} mb={2}>
        Crypto Portfolio Tracker
      </Text>
      <Text mb={8} fontWeight={600} color="gray.600">
        Keep track of your profits, losses and portfolio valuation with our easy
        to use platform.
      </Text>
      <AddNewPortfolioModal />
    </Container>
  );
};
