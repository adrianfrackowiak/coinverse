import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ModalButton } from "../AddNewCoinModal";

export const CurrentInfo = () => {
  const portfolioData = useSelector((state: RootState) => state.portfolio);

  return (
    <Box w={[300, 400, 500]} py={10}>
      <Box>
        <Text as="h3" fontSize="1.25rem" fontWeight={800}>
          {portfolioData.portfolio.portfolioName} - Portfolio
        </Text>
      </Box>
      <Box mb={6}>
        Current Balance:
        <Text fontSize="1.5rem" fontWeight={600}>
          ${portfolioData.portfolio.balance}
        </Text>
      </Box>
      <ModalButton />
    </Box>
  );
};
