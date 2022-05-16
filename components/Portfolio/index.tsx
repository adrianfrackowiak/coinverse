import { Container, Stack } from "@chakra-ui/react";
import { CurrentInfo } from "./CurrentInfo";
import { PortfolioList } from "./PortfolioList";

export const PortfolioComponent = () => {
  return (
    <Container maxW="1400px" display="flex" flexDirection="column" h="full">
      <Stack direction={["column", "row"]} spacing="2rem">
        <CurrentInfo />
        <PortfolioList />
      </Stack>
    </Container>
  );
};
