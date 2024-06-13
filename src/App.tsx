import "@mantine/core/styles.css";
import { Box, Card, Center, MantineProvider, Stack } from "@mantine/core";
import { theme } from "./theme";
import Header from "./features/Header/Header";
import Wallet from "./features/Wallet/Wallet";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { createWeb3Modal } from "@web3modal/ethers/react";
import { ethersConfig, mainnet, projectId } from './walletconnect';

export default function App() {
  const [manualAddress, setManualAddress] = useState('');
  const [manualAddressOpened, manualAddressHandle] = useDisclosure(false);

  createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true,
  })

  return <MantineProvider theme={theme} defaultColorScheme="dark">
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
          </Stack>
        </Card.Section>
        <Box my={"md"}>

        </Box>
      </Card>
    </Center>
  </MantineProvider>;
}
