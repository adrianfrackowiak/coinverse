import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ListItem,
  List,
  Image,
  useDisclosure,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  ModalFooter,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculatePortfolioBalance } from "../../../app/features/userSlice";
import { useCoinData, useCryptoListData } from "../../../app/hooks/useData";
import { ICoin } from "../../../app/interfaces/ICoins";
import { RootState } from "../../../app/store";

export const PortfolioList = () => {
  const portfolioData = useSelector((state: RootState) => state.portfolio);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [pricePerCoin, setPricePerCoin] = useState<number>(0);
  const [totalSpent, setTotalSpent] = useState<number>(0);

  const { data, isLoading, isError } = useCryptoListData(1, 100);
  const coinData = useCoinData(selectedCoin);

  const addCoinToPortfolio = async (e: React.SyntheticEvent) => {
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

  const calcBalance = (coin: ICoin) => {
    if (data) {
      const filteredCoin = data.filter((val: { id: string }) => {
        return val.id === coin.name;
      });

      let holdings = coin.holdings * filteredCoin[0].current_price;
      let profitOrLoss = holdings - coin.buyPrice * coin.holdings;

      return { filteredCoin, holdings, profitOrLoss };
    }

    return { filteredCoin: [], holdings: 0, profitOrLoss: 0 };
  };

  useEffect(() => {
    setSelectedCoin("");
    setQuantity(0);
    setPricePerCoin(0);
    setTotalSpent(0);
    if (coinData?.data?.market_data?.current_price?.usd)
      setPricePerCoin(coinData?.data?.market_data?.current_price?.usd);
  }, [isOpen]);

  useEffect(() => {
    setTotalSpent(quantity ? quantity * pricePerCoin : 0);
    console.log(quantity, pricePerCoin);
  }, [quantity, pricePerCoin]);

  useEffect(() => {
    if (portfolioData.portfolio.coins) {
      let count: number = 0;
      portfolioData.portfolio.coins.map((coin, index) => {
        let balance: number = calcBalance(coin).holdings;
        count += balance;
      });
      dispatch(calculatePortfolioBalance(count));
    }
  }, [data]);

  if (isError && coinData.isLoading) console.error(isError);
  if (isLoading && coinData.isLoading && !portfolioData && !data)
    return <p>Loading...</p>;

  return (
    <Box
      w="full"
      py={10}
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        as="button"
        background="#4f35de"
        borderRadius="lg"
        py="8px"
        px="20px"
        color="white"
        fontWeight={700}
        onClick={onOpen}
      >
        Add new coin
      </Box>
      <Modal
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
        size={"lg"}
        scrollBehavior={"inside"}
      >
        <ModalOverlay bg="4e35de28" backdropFilter="blur(4px)" />
        <ModalContent>
          <ModalHeader>
            {selectedCoin === "" ? "Select Coin" : "Add transaction"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCoin === "" ? (
              <List>
                {data?.slice(0, 100).map((coin: any, index: number) => {
                  return (
                    <ListItem key={index}>
                      <Box
                        as="button"
                        w="full"
                        h="full"
                        py={2}
                        px={2}
                        borderRadius="lg"
                        cursor="pointer"
                        display="flex"
                        _hover={{ background: "gray.100" }}
                        onClick={() => {
                          setSelectedCoin(coin.id);
                          setPricePerCoin(coin.current_price);
                        }}
                      >
                        <Image
                          src={coin.image}
                          alt={coin.name}
                          boxSize="24px"
                          mr={5}
                          borderRadius="full"
                        />
                        <Text fontWeight={600}>{coin.name}</Text>
                      </Box>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              coinData.data && (
                <Box>
                  <Box>
                    <Box display="flex" mb={4}>
                      <Image
                        src={coinData.data.image.large}
                        alt={coinData.data.name}
                        boxSize="24px"
                        mr={2}
                        borderRadius="full"
                      />
                      <Text fontWeight={700}>{coinData.data.name}</Text>
                    </Box>

                    <Stack spacing={4} direction={["column", "row"]} mb={4}>
                      <Box w="50%">
                        <Text>Quantity</Text>
                        <Input
                          placeholder="0.00"
                          type="number"
                          onChange={(e: {
                            target: {
                              valueAsNumber: SetStateAction<number>;
                            };
                          }) => {
                            setQuantity(e.target.valueAsNumber);
                          }}
                        />
                      </Box>

                      <Box w="50%">
                        <Text>Price per coin</Text>
                        <InputGroup>
                          <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                            fontSize="1.2em"
                          >
                            $
                          </InputLeftElement>
                          <Input
                            placeholder={
                              coinData.data.market_data.current_price.usd
                            }
                            defaultValue={
                              coinData.data.market_data.current_price.usd
                            }
                            type="number"
                            onChange={(e: {
                              target: {
                                valueAsNumber: SetStateAction<number>;
                              };
                            }) => {
                              setPricePerCoin(e.target.valueAsNumber);
                            }}
                          />
                        </InputGroup>
                      </Box>
                    </Stack>
                    <Box
                      w="full"
                      px={4}
                      py={4}
                      bg={"gray.100"}
                      borderRadius={"lg"}
                    >
                      Total:
                      <Text fontSize={"2rem"} fontWeight={700}>
                        ${totalSpent}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              )
            )}
          </ModalBody>
          {selectedCoin !== "" && coinData.data && (
            <ModalFooter>
              <Box
                as="button"
                type="button"
                w="full"
                background="#4f35de"
                borderRadius="lg"
                py="8px"
                px="20px"
                color="white"
                fontWeight={700}
                onClick={(e) => {
                  onClose();
                  addCoinToPortfolio(e);
                }}
              >
                Add new coin
              </Box>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>

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
                  let currentCoinData = calcBalance(coin);

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
