import {
  Box,
  Container,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Image,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { pageState, perPageState } from "../../app/features/appSlice";
import { useData } from "../../app/hooks/useData";

export const CryptoList = () => {
  const page = useSelector(pageState);
  const perPage = useSelector(perPageState);

  const { data, isLoading, isError } = useData(page, perPage);
  if (isError) console.error(isError);
  if (isLoading) return <p>Loading...</p>;

  return (
    <Container
      maxW="1400px"
      display="flex"
      h="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="full" py={10}>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Name</Th>
                <Th isNumeric>Price</Th>
                <Th isNumeric>24h %</Th>
                <Th isNumeric>All Time High</Th>
                <Th isNumeric>ATH %</Th>
                <Th isNumeric>Market Cap</Th>
                <Th isNumeric>MC %</Th>
                <Th isNumeric>Circulating Supply</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.slice(0, 100).map((coin: any, index: number) => {
                return (
                  <Tr key={index} _hover={{ background: "gray.100" }}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Box display="flex" alignItems="center">
                        <Image
                          src={coin.image}
                          alt={coin.name}
                          boxSize="24px"
                          mr={2}
                          borderRadius="full"
                        />
                        {coin.name}{" "}
                        <Text
                          color="gray.300"
                          ml={2}
                          textTransform="uppercase"
                          fontWeight={500}
                          fontSize="0.75rem"
                        >
                          {coin.symbol}
                        </Text>
                      </Box>
                    </Td>

                    <Td isNumeric>
                      ${Intl.NumberFormat("en-US").format(coin.current_price)}
                    </Td>
                    <Td
                      isNumeric
                      color={
                        coin.price_change_percentage_24h > 0 ? "green" : "red"
                      }
                    >
                      {coin.price_change_percentage_24h.toFixed(1)} %
                    </Td>

                    <Td isNumeric>
                      ${Intl.NumberFormat("en-US").format(coin.ath)}
                    </Td>
                    <Td isNumeric>{coin.ath_change_percentage.toFixed(1)} %</Td>
                    <Td isNumeric>
                      ${Intl.NumberFormat("en-US").format(coin.market_cap)}
                    </Td>
                    <Td
                      isNumeric
                      color={
                        coin.market_cap_change_percentage_24h > 0
                          ? "green"
                          : "red"
                      }
                    >
                      {coin.market_cap_change_percentage_24h.toFixed(1)} %
                    </Td>
                    <Td isNumeric>
                      {coin.circulating_supply.toLocaleString()} {coin.symbol}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};
