import {
  Box,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Container,
  Button,
} from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import { PrimaryButton } from "../../app/helpers/PrimaryButton";

export const CreatePortfolio = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newPortfolioName, setNewPortfolioName] = useState<string>("");

  const createNewPortfolio = async (e: React.SyntheticEvent) => {
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
      <PrimaryButton text="Create Portfolio" event={onOpen} />
      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Portfolio</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Enter your portfolio name"
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setNewPortfolioName(e.target.value)
              }
            />
          </ModalBody>

          <ModalFooter>
            <Box
              as="button"
              type="button"
              disabled={!newPortfolioName}
              mr={3}
              onClick={(e) => {
                createNewPortfolio(e);
                onClose();
              }}
            >
              Create
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
