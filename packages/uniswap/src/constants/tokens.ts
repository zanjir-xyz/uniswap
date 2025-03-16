/* eslint-disable max-lines */
import { Currency, NativeCurrency, Token, UNI_ADDRESSES, WETH9 } from '@uniswap/sdk-core'
import invariant from 'tiny-invariant'
import { UniverseChainId } from 'uniswap/src/features/chains/types'

export const USDC_ZANJIR = new Token(
  UniverseChainId.Zanjir,
  '0xCccCCccc7021b32EBb4e8C08314bD62F7c653EC4',
  6,
  'USDC',
  'USD Coin',
)

export const UNI = {
  [UniverseChainId.Zanjir]: new Token(
    UniverseChainId.Zanjir,
    UNI_ADDRESSES[UniverseChainId.Zanjir] as string,
    18,
    'UNI',
    'Uniswap',
  ),
}


export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token } = {
  ...(WETH9 as Record<UniverseChainId, Token>),
  [UniverseChainId.Zanjir]: new Token(
    UniverseChainId.Zanjir,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    18,
    'WETH',
    'Wrapped Ether',
  ),
  [UniverseChainId.ZanjirTestnet]: new Token(
    UniverseChainId.ZanjirTestnet,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    18,
    'WETH',
    'Wrapped Ether',
  ),
}

class ExtendedEther extends NativeCurrency {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    if (wrapped) {
      return wrapped
    }
    throw new Error(`Unsupported chain ID: ${this.chainId}`)
  }

  protected constructor(chainId: number) {
    super(chainId, 18, 'ETH', 'Ethereum')
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {}

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedExtendedEther[chainId] ?? (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency | Token } = {}
export function nativeOnChain(chainId: number): NativeCurrency | Token {
  if (cachedNativeCurrency[chainId]) {
    return cachedNativeCurrency[chainId] as NativeCurrency
  }
  let nativeCurrency: NativeCurrency | Token
  nativeCurrency = ExtendedEther.onChain(chainId)
  return (cachedNativeCurrency[chainId] = nativeCurrency)
}
