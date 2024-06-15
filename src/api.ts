import { useQuery } from "@tanstack/react-query";
import { isValidAddress } from "./utils";
import { Alchemy, Network, OwnedNft } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

const useNfts = (
  address: string,
  manualAddress: string,
  reset: () => void
) => {
  return useQuery({
    queryKey: ["nfts", address, manualAddress],
    queryFn: async () => {
      reset();
      
      const userAddress = isValidAddress(address) ? address : (isValidAddress(manualAddress) ? manualAddress : '');
      if (userAddress === "") return [];

      const data = await alchemy.nft.getNftsForOwner(userAddress);

      return data.ownedNfts;
    },
    enabled: isValidAddress(address) || isValidAddress(manualAddress),
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false
  })
}

const useNftsMetada = (
  ownedNfts: OwnedNft[] | undefined,
  increment: () => void
) => {
  return useQuery({
    queryKey: ["nfts", ownedNfts],
    queryFn: async () => {
      if (ownedNfts === undefined) return [];
      
      const nfts = [];
      for (let i = 0; i < ownedNfts.length; i++) {
        const { contract, tokenId } = ownedNfts[i];
        
        const metadata = await alchemy.nft.getNftMetadata(contract.address, tokenId);
        increment();
        
        nfts.push(metadata);
      }

      return nfts;
    },
    enabled: ownedNfts !== undefined && ownedNfts.length > 0,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false
  })
}

export {
  useNfts,
  useNftsMetada
}