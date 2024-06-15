import { ActionIcon, Anchor, CopyButton, Group, Image, Stack, Text, Tooltip } from "@mantine/core";
import { FC } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Nft } from "alchemy-sdk";

interface NFTListProps {
  nfts: Nft[],
}

const NFTList: FC<NFTListProps> = ({
  nfts
}: NFTListProps) => {

  return (
    <Stack gap={"md"} maw={400}>
      {
        nfts && nfts.map(nft => {
          return (
            <Group key={nft.tokenId} justify='space-between' gap={"xl"} align='center' wrap='nowrap'>
              <Group>
                <Stack gap={2} align='start'>
                  <Anchor size='sm' c={'var(--mantine-color-text)'} target='_blank' href={nft.image.originalUrl}>
                    {nft.name}
                  </Anchor>
                  <Text size='xs' c={'dimmed'}>{nft.contract.address}</Text>
                </Stack>
              </Group>
              <Group gap={"xs"}>
                <CopyButton value={nft.contract.address} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy contract address'} withArrow position="right">
                      <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                        {copied ? (
                          <IconCheck size={16} />
                        ) : (
                          <IconCopy size={16} />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
                <Image w={100} src={nft.image.pngUrl} />
              </Group>
            </Group>
          )
        })
      }
    </Stack>
  )
}

export default NFTList;