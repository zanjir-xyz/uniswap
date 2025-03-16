import { Currency, Token, WETH9 } from '@uniswap/sdk-core'
import type { ImageSourcePropType } from 'react-native'
import { CELO_LOGO, ETH_LOGO } from 'ui/src/assets'
import {
  USDC_ZANJIR,
  WRAPPED_NATIVE_CURRENCY,
  nativeOnChain,
} from 'uniswap/src/constants/tokens'
import { ProtectionResult } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'
import { getChainInfo } from 'uniswap/src/features/chains/chainInfo'
import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { CurrencyInfo, TokenList } from 'uniswap/src/features/dataApi/types'
import { buildCurrencyInfo } from 'uniswap/src/features/dataApi/utils'
import { isSameAddress } from 'utilities/src/addresses'

type ChainCurrencyList = {
  readonly [chainId: number]: CurrencyInfo[]
}

/**
 * @deprecated
 * Instead, see the list used in the token selector's quick-select common options section at useAllCommonBaseCurrencies.ts.
 * This list is currently used as fallback list when Token GQL query fails for above list + for hardcoded tokens on testnet chains.
 */
export const COMMON_BASES: ChainCurrencyList = {
  [UniverseChainId.Zanjir]: [
    nativeOnChain(UniverseChainId.Zanjir),
    WRAPPED_NATIVE_CURRENCY[UniverseChainId.Zanjir] as Token,
    USDC_ZANJIR,
  ].map(buildPartialCurrencyInfo),
  [UniverseChainId.ZanjirTestnet]: [
    nativeOnChain(UniverseChainId.ZanjirTestnet),
    WRAPPED_NATIVE_CURRENCY[UniverseChainId.ZanjirTestnet] as Token,
    USDC_ZANJIR,
  ].map(buildPartialCurrencyInfo),
}

export function getCommonBase(chainId?: number, isNative?: boolean, address?: string): CurrencyInfo | undefined {
  if (!address || !chainId) {
    return undefined
  }
  return COMMON_BASES[chainId]?.find(
    (base) =>
      (base.currency.isNative && isNative) || (base.currency.isToken && isSameAddress(base.currency.address, address)),
  )
}

function getNativeLogoURI(chainId: UniverseChainId = UniverseChainId.Zanjir): ImageSourcePropType {
  if (chainId === UniverseChainId.Zanjir) {
    return ETH_LOGO as ImageSourcePropType
  }

  return getChainInfo(chainId).nativeCurrency.logo ?? (ETH_LOGO as ImageSourcePropType)
}

function getTokenLogoURI(chainId: UniverseChainId, address: string): ImageSourcePropType | string | undefined {
  const chainInfo = getChainInfo(chainId)
  const networkName = chainInfo?.assetRepoNetworkName

  return networkName
    ? `https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/${networkName}/assets/${address}/logo.png`
    : undefined
}

export function buildPartialCurrencyInfo(commonBase: Currency): CurrencyInfo {
  const logoUrl = commonBase.isNative
    ? getNativeLogoURI(commonBase.chainId)
    : getTokenLogoURI(commonBase.chainId, commonBase.address)

  return buildCurrencyInfo({
    currency: commonBase,
    logoUrl,
    safetyInfo: {
      tokenList: TokenList.Default,
      protectionResult: ProtectionResult.Benign,
    },
    isSpam: false,
  } as CurrencyInfo)
}
