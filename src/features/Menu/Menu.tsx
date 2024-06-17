import { ActionIcon, Burger, Collapse, Group, Stack, Text } from "@mantine/core";
import { FC } from "react";
import ColorThemeSwitcher from "./ColorThemeSwitcher/ColorThemeSwitcher";
import { useDisclosure } from "@mantine/hooks";
import AboutButton from "./About/AboutButton";
import { IconRefresh } from "@tabler/icons-react";

interface MenuProps {
  tokensCount: number | undefined,
  reset: () => void
  refetch: any,
  isRefetching: any
}

const Menu: FC<MenuProps> = ({ tokensCount, reset, refetch, isRefetching }: MenuProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  const refresh = () => {
    reset();
    refetch();
  }

  return (
    <>
      <Group justify='space-between' wrap="nowrap">
        <Burger onClick={toggle} opened={opened} color='violet.5' size={"sm"} />
        {
          tokensCount !== undefined &&
          (
            isRefetching
              ? <Text size="sm">Refetching...</Text>
              : <Group>
                <Text size="sm">{tokensCount} tokens found</Text>
                <ActionIcon disabled={isRefetching} size={"xs"} onClick={refresh} variant="subtle">
                  <IconRefresh size={14} />
                </ActionIcon>
              </Group>
          )
        }
        <ColorThemeSwitcher />
      </Group >
      <Collapse in={opened}>
        <Stack gap={"xs"}>
          <AboutButton />
        </Stack>
      </Collapse>
    </>
  )
}

export default Menu;