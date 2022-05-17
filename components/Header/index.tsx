import { Box } from "@chakra-ui/react";
import { MarketData } from "./MarketData";
import { TopNav } from "./TopNav";

export const Header = () => {
  return (
    <Box>
      <MarketData />
      <TopNav />
    </Box>
  );
};
