import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import { createNewPortfolio } from "../../../app/functions/createNewPortfolio";
import { PrimaryButton } from "../../../app/helpers/PrimaryButton";

export const AddNewPortfolioModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newPortfolioName, setNewPortfolioName] = useState<string>("");

  return (
    <>
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
            <PrimaryButton
              text="Create"
              disabled={!newPortfolioName}
              event={(e: React.SyntheticEvent) => {
                createNewPortfolio(e, newPortfolioName);
                onClose();
              }}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
