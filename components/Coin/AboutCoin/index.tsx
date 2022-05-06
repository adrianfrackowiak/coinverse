import { ChevronDownIcon, LinkIcon, TriangleDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Image,
  Heading,
  Text,
  List,
  ListItem,
  Button,
  Link,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentCoinState } from "../../../app/features/appSlice";
import { useCoinData } from "../../../app/hooks/useData";
import { ILinks } from "../../../app/interfaces/ILinks";

export const AboutCoin: React.FC = () => {
  const stateCoinId = useSelector(currentCoinState);
  const { data, isLoading, isError } = useCoinData(
    typeof stateCoinId === "string" ? stateCoinId : ""
  );
  const [links, setLinks] = useState<ILinks>({});
  const [isWebsitesOpen, setIsWebsitesOpen] = useState<boolean>(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState<boolean>(false);
  const [isCodeOpen, setIsCodeOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<string>("");

  useEffect(() => {
    setLinks({
      homepage: data.links.homepage[0] && data.links.homepage[0],
      websites: [
        data.links.blockchain_site &&
          data.links.blockchain_site.filter((site: any, index: any) => {
            if (site !== "") return site;
          }),

        data.links.announcement_url &&
          data.links.announcement_url.filter((site: any, index: any) => {
            if (site !== "") return site;
          }),
      ],
      community: [
        data.links.chat_url &&
          data.links.chat_url.filter((site: any, index: any) => {
            if (site !== "") return site;
          }),
        data.links.facebook_username &&
          `https://facebook.com/${data.links.facebook_username}`,

        data.links.official_forum_url &&
          data.links.official_forum_url.filter((site: any, index: any) => {
            if (site !== "") return site;
          }),
        data.links.subreddit_url && data.links.subreddit_url,
        data.links.twitter_screen_name &&
          `https://twitter.com/${data.links.twitter_screen_name}`,
      ],
      code: [
        data.links.repos_url.github[0] && data.links.repos_url.github[0],
        data.links.repos_url.bitbucket[0] && data.links.repos_url.bitbucket[0],
      ],
    });
  }, [data]);

  if (isError) console.error(isError);
  if (isLoading && !links) return <p>Loading...</p>;

  return (
    <Box width="32%">
      <Box display="flex" alignItems="center" mb={6}>
        <Image
          src={data.image.large}
          alt={data.name}
          h="32px"
          w="32px"
          borderRadius="50%"
          mr={3}
        />
        <Heading fontWeight={900}>{data.name}</Heading>
      </Box>
      <Box display="flex" alignItems="center">
        <Text
          textTransform="uppercase"
          fontWeight={600}
          fontSize="0.78125rem"
          color="gray.600"
          background="gray.200"
          py={1}
          px={2}
          borderRadius={4}
          mr={3}
        >
          {data.symbol}
        </Text>
        <Text
          fontWeight={600}
          fontSize="0.78125rem"
          color="gray.200"
          background="gray.600"
          py={1}
          px={2}
          borderRadius={4}
        >
          Rank #{data.market_cap_rank}
        </Text>
      </Box>

      <Heading mt={12} as="h4" fontSize="0.75rem" mb={2}>
        Links:
      </Heading>
      <Wrap display="flex" alignItems="start">
        {Object.values(links).map((link, index) => {
          if (index === 0) {
            link = new URL(link);
            return (
              <WrapItem
                key={index}
                fontWeight={700}
                fontSize="0.75rem"
                color="black"
                background="gray.200"
                py={1}
                px={2}
                borderRadius={4}
                mr={3}
                display="flex"
                alignItems="center"
                cursor="pointer"
              >
                <NextLink href={link} passHref key={index}>
                  <Box as="a">
                    <LinkIcon mr={2} />
                    {link.hostname.replace("www.", "")}
                  </Box>
                </NextLink>
              </WrapItem>
            );
          }

          if (link.filter(Boolean).length !== 0) {
            return (
              <WrapItem
                key={index}
                as={motion.div}
                onHoverStart={() => {
                  setIsOpen(Object.keys(links)[index]);
                }}
                onHoverEnd={() => {
                  setIsOpen("");
                }}
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="center"
                mr={3}
              >
                <Box
                  as="button"
                  fontWeight={700}
                  fontSize="0.75rem"
                  color="black"
                  background="gray.200"
                  py={1}
                  px={2}
                  borderRadius={4}
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                >
                  <LinkIcon mr={2} />
                  {Object.keys(links)[index]} <ChevronDownIcon ml={1} />
                </Box>
                {isOpen === Object.keys(links)[index] && (
                  <Box p={4} position="absolute" top={4}>
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
                        {link.flat().map((element: any, index: number) => {
                          if (element && element !== "") {
                            element = new URL(element);
                            console.log(element, index);
                            return (
                              <NextLink href={element} passHref key={index}>
                                <Box as="a">
                                  <ListItem
                                    fontWeight={700}
                                    fontSize="0.75rem"
                                    color="black"
                                    py={2}
                                    px={4}
                                    borderRadius={4}
                                    _hover={{ background: "gray.100" }}
                                  >
                                    {element.hostname.replace("www.", "")}
                                  </ListItem>
                                </Box>
                              </NextLink>
                            );
                          }
                        })}
                      </List>
                    </AnimatePresence>
                  </Box>
                )}
              </WrapItem>
            );
          }
        })}
      </Wrap>

      <Heading mt={4} as="h4" fontSize="0.75rem" mb={2}>
        Contract:
      </Heading>
      <Wrap display="flex" flexDirection="column" alignItems="start">
        {Object.entries(data.platforms).map((contract: any, index: number) => {
          if (contract[index] !== "") {
            return (
              <WrapItem
                fontWeight={700}
                fontSize="0.75rem"
                color="black"
                background="gray.200"
                py={1}
                px={2}
                borderRadius={4}
                mr={3}
                mb={2}
                display="flex"
                alignItems="center"
                cursor="pointer"
              >
                <Text color="gray.500" fontWeight={500} mr={1}>
                  {contract[0]}:
                </Text>
                {contract[1].substring(0, 10) + "..."}
              </WrapItem>
            );
          }
        })}
      </Wrap>

      <Heading mt={4} as="h4" fontSize="0.75rem" mb={2}>
        Categories:
      </Heading>
      <Box display="flex" alignItems="start">
        {data.categories.map((cat: string, index: number) => {
          if (cat) {
            return (
              <Text
                key={index}
                fontWeight={700}
                fontSize="0.75rem"
                color="black"
                background="gray.200"
                py={1}
                px={2}
                borderRadius={4}
                mr={3}
                display="flex"
                alignItems="center"
              >
                {cat}
              </Text>
            );
          }
        })}
      </Box>
    </Box>
  );
};
