import { Chain } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'

export default function getNetworkLogoUrl(network: string, origin: string) {
  switch (network) {
    case Chain.Zanjir:
      return 'https://zanjir.xyz/irt.svg'
    case Chain.ZanjirTestnet:
      return 'https://zanjir.xyz/irt.svg'
    default:
      return ''
  }
}
