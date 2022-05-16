import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { addCoinToPortfolio } from "../../../app/functions/addCoinToPortfolio";
import { PrimaryButton } from "../../../app/helpers/PrimaryButton";
import { useCoinData, useCryptoListData } from "../../../app/hooks/useData";

export const ModalButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [pricePerCoin, setPricePerCoin] = useState<number>(0);
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const { data, isLoading, isError } = useCryptoListData(1, 100);
  const coinData = useCoinData(selectedCoin);
  const router = useRouter();

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

  if (isError && coinData.isLoading) console.error(isError);
  if (isLoading && coinData.isLoading && !data) return <p>Loading...</p>;

  return (
    <>
      <PrimaryButton text="Add new coin" event={onOpen} />
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
                onClick={(e: React.SyntheticEvent) => {
                  onClose();
                  addCoinToPortfolio(e, selectedCoin, quantity, pricePerCoin);
                  router.reload();
                }}
              >
                Add new coin
              </Box>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
