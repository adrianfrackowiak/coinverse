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
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { useGlobalData } from "../../app/hooks/useData";

export const Header = () => {
  const { data: session, status } = useSession();
  const globalData = useGlobalData();
  if (globalData.isError) console.error(globalData.isError);
  if (globalData.isLoading) return <p>Loading...</p>;

  console.log(session);

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="center" h={10}>
        <Container
          maxW="1400px"
          display="flex"
          h="full"
          alignItems="center"
          overflowY="auto"
        >
          <List display="flex" fontSize="0.75rem">
            <ListItem display="flex" mr={5} fontWeight={600}>
              Cryptos:
              <Text ml={2} color="#016FB9">
                {globalData.data.data.active_cryptocurrencies}
              </Text>
            </ListItem>
            <ListItem display="flex" mr={5} fontWeight={600}>
              Market Cap:{" "}
              <Text ml={2} color="#016FB9">
                $
                {Intl.NumberFormat("en-US").format(
                  globalData.data.data.total_market_cap.usd
                )}
              </Text>
            </ListItem>
            <ListItem display="flex" mr={5} fontWeight={600}>
              24h Vol:{" "}
              <Text ml={2} color="#016FB9">
                $
                {Intl.NumberFormat("en-US").format(
                  globalData.data.data.total_volume.usd
                )}
              </Text>
            </ListItem>
            <ListItem display="flex" mr={5} fontWeight={600}>
              Dominance:{" "}
              <Text ml={2} color="#016FB9">
                BTC: {globalData.data.data.market_cap_percentage.btc.toFixed(1)}
                % ETH:{" "}
                {globalData.data.data.market_cap_percentage.eth.toFixed(1)}%
              </Text>
            </ListItem>
          </List>
        </Container>
      </Box>

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
            <ListItem ml={5}>Portfolio</ListItem>
          </List>
          <Spacer />
          {session && status === "authenticated" ? (
            session?.user?.image ? (
              <Image
                src={session.user?.image}
                alt={`${session.user?.name} Avatar`}
                h="26px"
                w="26px"
                borderRadius="50%"
              />
            ) : (
              <Image
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt="Undefined"
                h="26px"
                w="26px"
                borderRadius="50%"
              />
            )
          ) : (
            <button onClick={() => signIn("github")}>
              Sign in with Github
            </button>
          )}
        </Container>
      </Box>
    </Box>
  );
};
