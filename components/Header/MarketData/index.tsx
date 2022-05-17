import { Box, Container, List, ListItem, Text } from "@chakra-ui/react";
import { useGlobalData } from "../../../app/hooks/useData";

export const MarketData = () => {
  const globalData = useGlobalData();

  if (globalData.isError) console.error(globalData.isError);
  if (globalData.isLoading) return <p>Loading...</p>;
  return (
    <Box display="flex" alignItems="center" justifyContent="center" h={10}>
      <Container
        maxW="1400px"
        display="flex"
        h="full"
        alignItems="center"
        overflowY="auto"
      >
        <List display="flex" fontSize="0.75rem">
          <ListItem display="flex" mr={5} fontWeight={600}>
            Cryptos:
            <Text ml={2} color="#4f35de">
              {globalData.data.data.active_cryptocurrencies}
            </Text>
          </ListItem>
          <ListItem display="flex" mr={5} fontWeight={600}>
            Market Cap:{" "}
            <Text ml={2} color="#4f35de">
              $
              {Intl.NumberFormat("en-US").format(
                globalData.data.data.total_market_cap.usd
              )}
            </Text>
          </ListItem>
          <ListItem display="flex" mr={5} fontWeight={600}>
            24h Vol:{" "}
            <Text ml={2} color="#4f35de">
              $
              {Intl.NumberFormat("en-US").format(
                globalData.data.data.total_volume.usd
              )}
            </Text>
          </ListItem>
          <ListItem display="flex" mr={5} fontWeight={600}>
            Dominance:{" "}
            <Text ml={2} color="#4f35de">
              BTC: {globalData.data.data.market_cap_percentage.btc.toFixed(1)}%
              ETH: {globalData.data.data.market_cap_percentage.eth.toFixed(1)}%
            </Text>
          </ListItem>
        </List>
      </Container>
    </Box>
  );
};
