import { Box } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

interface Props {
  text: string;
  event: MouseEventHandler<HTMLDivElement> &
    MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({ text, event, disabled }) => {
  return (
    <Box
      as="button"
      onClick={event}
      disabled={disabled}
      py={3}
      px={6}
      borderRadius="0.75rem"
      fontSize="0.875rem"
      fontWeight="semibold"
      bg="#4f35de"
      color="white"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      _hover={{
        bg: "#5c43eb",
        boxShadow: "0 0 10px 2px #4e35de1a, 0 2px 1px #000000f",
      }}
      _focus={{
        boxShadow: "0 0 10px 2px #4e35de65, 0 2px 1px rgba(0, 0, 0, .15)",
      }}
    >
      {text}
    </Box>
  );
};
