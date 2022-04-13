import {
  Box,
  Container,
  Heading,
  List,
  ListItem,
  Spacer,
} from "@chakra-ui/react";

export const Header = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h={16}
      boxShadow="lg"
    >
      <Container
        maxW="1400px"
        display="flex"
        h="full"
        alignItems="center"
        justifyContent="center"
      >
        <Heading as="h1" size="lg">
          CoinVerse
        </Heading>
        <Spacer />
        <List display="flex">
          <ListItem ml={5}>Cryptocurrencies</ListItem>
          <ListItem ml={5}>Portfolio</ListItem>
        </List>
      </Container>
    </Box>
  );
};
