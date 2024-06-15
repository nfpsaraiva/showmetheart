import "@mantine/core/styles.css";
import { Box, Card, Center, RingProgress, Stack, Text } from "@mantine/core";
import Header from "./features/Header/Header";
import Wallet from "./features/Wallet/Wallet";
import { useCounter, useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { createWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { ethersConfig, mainnet, projectId } from './walletconnect';
import { useNfts, useNftsMetada } from "./api";
import NFTList from "./features/NFT/NFTList";
import Menu from "./features/Menu/Menu";

export default function App() {
  const [manualAddress, setManualAddress] = useState('');
  const [manualAddressOpened, manualAddressHandle] = useDisclosure(false);
  const { address } = useWeb3ModalAccount();
  const [count, handlers] = useCounter(0);

  createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true,
  });

  const {
    data: ownedNfts,
  } = useNfts(
    address as string,
    manualAddress,
    handlers.reset
  );

  const {
    data: nfts,
    isLoading,
    refetch,
    isRefetching,
    isError
  } = useNftsMetada(
    ownedNfts,
    handlers.increment
  );

  return (
    <Center my={"xl"} mx={"sm"}>
      <Card radius={"lg"} shadow='lg' padding={"lg"} withBorder>
        <Card.Section py={"md"} inheritPadding withBorder>
          <Stack gap={"lg"}>
            <Header />
            <Wallet
              manualAddressOpened={manualAddressOpened}
              manualAddress={manualAddress}
              setManualAddress={setManualAddress}
              manualAddressToggle={manualAddressHandle.toggle}
            />
            <Menu tokensCount={ownedNfts?.length} refetch={refetch} isRefetching={isRefetching} />
          </Stack>
        </Card.Section>
        <Box my={"md"}>
          {
            (isLoading || isRefetching) && ownedNfts &&
            <Stack align="center">
              <RingProgress
                roundCaps
                label={
                  <Text size='xs' ta={"center"}>{count} nfts</Text>
                }
                sections={[
                  { value: (count * 100 / ownedNfts.length), color: 'orange' },
                ]}
              />
            </Stack>
          }
          {
            isError &&
            <Center>
              <Stack gap={4}>
                <Text>An error occured</Text>
                <Text size='xs' c={"dimmed"}>Please contact support</Text>
              </Stack>
            </Center>
          }
          {
            nfts && !isRefetching &&
            <NFTList
              nfts={nfts}
            />
          }
        </Box>
      </Card>
    </Center>
  )
}
