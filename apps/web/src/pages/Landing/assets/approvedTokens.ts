import ethereumLogo from 'assets/images/ethereum-logo.png'
import { NATIVE_CHAIN_ID } from 'constants/tokens'
import { Chain } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'

export enum TokenStandard {
  ERC20 = 0,
  ERC721 = 1,
}

export interface InteractiveToken {
  name: string
  symbol: string
  address: string
  chain: Chain
  standard: TokenStandard
  color: string
  logoUrl: string
}

export const approvedERC20: InteractiveToken[] = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    address: NATIVE_CHAIN_ID,
    chain: Chain.Zanjir,
    standard: TokenStandard.ERC20,
    color: '#627EEA',
    logoUrl: ethereumLogo,
  },
  {
    name: 'USDCoin',
    symbol: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    chain: Chain.Zanjir,
    standard: TokenStandard.ERC20,
    color: '#2775CA',
    logoUrl:
      'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
  },
]

export const approvedERC721: InteractiveToken[] = [
]
