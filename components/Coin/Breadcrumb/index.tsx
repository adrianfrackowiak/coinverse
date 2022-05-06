import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { Link, List, ListItem } from "@chakra-ui/react";

export const Breadcrumb: React.FC<{ coin: string }> = ({ coin }) => {
  return (
    <List display="flex" alignItems="center" fontSize="0.8125rem">
      <ListItem mr={5}>
        <NextLink href="/" passHref>
          <Link _hover={{ textDecor: "none" }}>Cryptocurrencies</Link>
        </NextLink>
      </ListItem>
      <ChevronRightIcon mr={5} color="gray.500" />
      <ListItem fontWeight={700}>{coin}</ListItem>
    </List>
  );
};
