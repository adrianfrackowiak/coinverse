import {
  Box,
  Text,
  Image,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculatePortfolioBalance } from "../../../app/features/userSlice";
import { calcBalance } from "../../../app/functions/calcBalance";
import { useCryptoListData } from "../../../app/hooks/useData";
import { RootState } from "../../../app/store";

export const PortfolioList = () => {
  const portfolioData = useSelector((state: RootState) => state.portfolio);
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useCryptoListData(1, 100);

  useEffect(() => {
    if (portfolioData.portfolio.coins) {
      let count: number = 0;
      portfolioData.portfolio.coins.map((coin, index) => {
        let balance: number = calcBalance(coin, data).holdings;
        count += balance;
      });
      dispatch(calculatePortfolioBalance(count));
    }
  }, [data, dispatch]);

  if (isError) console.error(isError);
  if (isLoading && !portfolioData && !data) return <p>Loading...</p>;

  return (
    <Box
      w="full"
      py={10}
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      {portfolioData.portfolio.coins.length === 0 ? (
        <Box mt={6}>
          <Text textAlign="center">This portfolio is empty</Text>
          <Text textAlign="center">Add any coin to get started</Text>
        </Box>
      ) : (
        <Box>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th fontFamily="main">Name</Th>
                  <Th isNumeric fontFamily="main">
                    Price
                  </Th>
                  <Th isNumeric fontFamily="main">
                    24h %
                  </Th>
                  <Th isNumeric fontFamily="main">
                    Holdings
                  </Th>
                  <Th isNumeric fontFamily="main">
                    Avg. Buy Price
                  </Th>
                  <Th isNumeric fontFamily="main">
                    Profit/Loss
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {portfolioData.portfolio.coins.map((coin, index) => {
                  let currentCoinData = calcBalance(coin, data);

                  return (
                    <Tr key={index} _hover={{ background: "gray.100" }}>
                      <Td>
                        <Box display="flex" alignItems="center">
                          <Image
                            src={currentCoinData.filteredCoin[0]?.image}
                            alt={currentCoinData.filteredCoin[0]?.name}
                            boxSize="24px"
                            mr={2}
                            borderRadius="full"
                          />
                          <Text fontWeight={700}>
                            {currentCoinData.filteredCoin[0]?.name}
                          </Text>
                          <Text
                            color="gray.300"
                            ml={2}
                            textTransform="uppercase"
                            fontWeight={500}
                            fontSize="0.75rem"
                          >
                            {currentCoinData.filteredCoin[0]?.symbol}
                          </Text>
                        </Box>
                      </Td>
                      <Td isNumeric>
                        $
                        {Intl.NumberFormat("en-US").format(
                          currentCoinData.filteredCoin[0]?.current_price
                        )}
                      </Td>
                      <Td
                        isNumeric
                        color={
                          currentCoinData.filteredCoin[0]
                            ?.price_change_percentage_24h > 0
                            ? "green"
                            : "red"
                        }
                      >
                        {currentCoinData.filteredCoin[0]?.price_change_percentage_24h.toFixed(
                          1
                        )}
                        %
                      </Td>
                      <Td isNumeric>
                        <Text textTransform="uppercase">
                          {coin.holdings}{" "}
                          {currentCoinData.filteredCoin[0]?.symbol}
                        </Text>
                        <Text>
                          $
                          {Intl.NumberFormat("en-US").format(
                            currentCoinData?.holdings
                          )}
                        </Text>
                      </Td>
                      <Td isNumeric>
                        ${Intl.NumberFormat("en-US").format(coin?.buyPrice)}
                      </Td>
                      <Td isNumeric>${currentCoinData?.profitOrLoss}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};
