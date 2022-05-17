import {
  Box,
  Container,
  Image,
  Link,
  List,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";

export const TopNav = () => {
  const { data: session, status } = useSession();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h={20}
      boxShadow="lg"
      borderY="1px"
      borderColor="gray.100"
    >
      <Container
        maxW="1400px"
        display="flex"
        h="full"
        alignItems="center"
        justifyContent="center"
      >
        <NextLink href="/" passHref>
          <Link _hover={{ textDecor: "none" }}>
            <Text fontFamily="main" fontSize="1.5rem" fontWeight={900}>
              CoinVerse
            </Text>
          </Link>
        </NextLink>
        <List ml={5} display="flex" fontWeight={700}>
          <ListItem ml={5}>Cryptocurrencies</ListItem>
          <ListItem ml={5}>
            <NextLink href="/portfolio">Portfolio</NextLink>
          </ListItem>
        </List>
        <Spacer />
        {session && status === "authenticated" ? (
          session.user && (
            <Box
              position="relative"
              display="flex"
              flexDirection="column"
              alignItems="end"
            >
              <Box>
                <Image
                  src={
                    session.user.image
                      ? session.user.image
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt={
                    session.user.name
                      ? `${session.user.name} Avatar`
                      : "Undefined Avatar"
                  }
                  h="26px"
                  w="26px"
                  borderRadius="50%"
                />
              </Box>
              <Box py={4} position="absolute" top={4}>
                <AnimatePresence>
                  <List
                    as={motion.ul}
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: 1,
                      transition: { ease: [0.17, 0.67, 0.83, 0.67] },
                    }}
                    exit={{
                      opacity: 0.5,
                      transition: { ease: [0.17, 0.67, 0.83, 0.67] },
                    }}
                    fontSize="0.75rem"
                    color="black"
                    background="white"
                    boxShadow="lg"
                    py={2}
                    px={3}
                    borderRadius={4}
                  >
                    <Box as="button" onClick={() => signOut()}>
                      <ListItem
                        fontWeight={700}
                        fontSize="0.75rem"
                        color="black"
                        py={2}
                        px={4}
                        borderRadius={4}
                        _hover={{ background: "gray.100" }}
                      >
                        Log out
                      </ListItem>
                    </Box>
                  </List>
                </AnimatePresence>
              </Box>
            </Box>
          )
        ) : (
          <>
            <button onClick={() => signIn("github")}>
              Sign in with Github
            </button>
            <button onClick={() => signIn("google")}>
              Sign in with Google
            </button>
          </>
        )}
      </Container>
    </Box>
  );
};
