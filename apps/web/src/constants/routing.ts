import { Token } from '@uniswap/sdk-core'
import {
  USDC_ZANJIR,
  WRAPPED_NATIVE_CURRENCY,
} from 'uniswap/src/constants/tokens'
import { UniverseChainId } from 'uniswap/src/features/chains/types'

type ChainTokenList = {
  readonly [chainId: number]: Token[]
}

const WRAPPED_NATIVE_CURRENCIES_ONLY: ChainTokenList = Object.fromEntries(
  Object.entries(WRAPPED_NATIVE_CURRENCY)
    .map(([key, value]) => [key, [value]])
    .filter(Boolean),
)

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WRAPPED_NATIVE_CURRENCIES_ONLY,
  [UniverseChainId.Zanjir]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[UniverseChainId.Zanjir],
    USDC_ZANJIR
  ],
  [UniverseChainId.ZanjirTestnet]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[UniverseChainId.ZanjirTestnet],
    USDC_ZANJIR
  ],
}

export const PINNED_PAIRS: { readonly [chainId: number]: [Token, Token][] } = {
  [UniverseChainId.Zanjir]: [
  ],
  [UniverseChainId.ZanjirTestnet]: [
  ],
}
