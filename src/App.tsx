import "@mantine/core/styles.css";
import { Box, Card, Center, MantineProvider, Stack } from "@mantine/core";
import { theme } from "./theme";
import Header from "./features/Header/Header";

export default function App() {
  return <MantineProvider theme={theme} defaultColorScheme="dark">
    <Center my={"xl"} mx={"sm"}>
      <Card radius={"lg"} shadow='lg' padding={"lg"} withBorder>
        <Card.Section py={"md"} inheritPadding withBorder>
          <Stack gap={"lg"}>
            <Header />
          </Stack>
        </Card.Section>
        <Box my={"md"}>

        </Box>
      </Card>
    </Center>
  </MantineProvider>;
}
