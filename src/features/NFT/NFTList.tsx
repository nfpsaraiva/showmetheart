import { Anchor, Card, Group, Image, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { Nft } from "alchemy-sdk";

interface NFTListProps {
  nfts: Nft[],
}

const NFTList: FC<NFTListProps> = ({
  nfts
}: NFTListProps) => {

  return (
    <Group gap={"md"} maw={450} align="center" justify="space-between">
      {
        nfts && nfts.map(nft => {
          const key = `${nft.contract.address}-${nft.tokenId}`;

          return (
            <Card withBorder>
              <Stack maw={100} key={key} gap={"xs"} align='start'>
                {
                  nft.image.pngUrl
                    ? <Image w={100} src={nft.image.pngUrl} />
                    : <Image alt="No image found" />
                }
                <Text size='xs' c={'var(--mantine-color-text)'}>
                  {nft.name}
                </Text>
                {
                  nft.collection &&
                  <Stack gap={3}>
                    <Text size="xs" fw={700}>Collection</Text>
                    <Text size="xs">{nft.collection.name}</Text>
                  </Stack>
                }
              </Stack>
            </Card>
          )
        })
      }
    </Group>
  )
}

export default NFTList;