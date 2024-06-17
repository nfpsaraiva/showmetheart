import { Modal, Text } from "@mantine/core";
import { FC } from "react";

interface AboutModalProps {
  opened: boolean,
  close: () => void
}

const AboutModal: FC<AboutModalProps> = ({
  opened,
  close
}: AboutModalProps) => {
  return (
    <Modal opened={opened} onClose={close} title="About">
      <Text>
        Straightforward and efficient tool designed for users to explore Non-Fungible Tokens (NFTs) on the Ethereum network.
      </Text>

    </Modal>
  )
}

export default AboutModal;