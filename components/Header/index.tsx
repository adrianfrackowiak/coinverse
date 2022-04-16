import {
  Box,
  Container,
  Heading,
  List,
  ListItem,
  Spacer,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
  const { data: session, status } = useSession();
  console.log(session, status);
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

        <List display="flex">
          <ListItem ml={5}>Cryptocurrencies</ListItem>
          <ListItem ml={5}>Portfolio</ListItem>
        </List>
        <Spacer />
        {session && status === "authenticated" ? (
          <button onClick={() => signOut()}>Sign out</button>
        ) : (
          <button onClick={() => signIn("github")}>Sign in with Github</button>
        )}
      </Container>
    </Box>
  );
};
