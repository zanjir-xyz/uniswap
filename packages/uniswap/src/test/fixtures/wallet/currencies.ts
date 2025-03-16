import { ProtectionResult } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'
import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { CurrencyInfo, SafetyInfo, TokenList } from 'uniswap/src/features/dataApi/types'
import { NativeCurrency } from 'uniswap/src/features/tokens/NativeCurrency'
import { faker } from 'uniswap/src/test/shared'
import { createFixture } from 'uniswap/src/test/utils'
import { currencyId } from 'uniswap/src/utils/currencyId'

export const ZANJIR_CURRENCY = NativeCurrency.onChain(UniverseChainId.Zanjir)
export const ZANJIR_TESTNET_CURRENCY = NativeCurrency.onChain(UniverseChainId.Zanjir)

type CurrencyInfoOptions = {
  nativeCurrency: NativeCurrency
}

export const benignSafetyInfo: SafetyInfo = {
  tokenList: TokenList.Default,
  protectionResult: ProtectionResult.Benign,
  blockaidFees: {
    buyFeePercent: 0,
    sellFeePercent: 0,
  },
}

export const currencyInfo = createFixture<CurrencyInfo, CurrencyInfoOptions>({
  nativeCurrency: ZANJIR_CURRENCY,
})(({ nativeCurrency }) => ({
  currencyId: currencyId(nativeCurrency),
  currency: nativeCurrency,
  logoUrl: faker.image.imageUrl(),
  safetyInfo: benignSafetyInfo,
}))

export const ethCurrencyInfo = createFixture<CurrencyInfo>()(() =>
  currencyInfo({
    nativeCurrency: ZANJIR_CURRENCY,
    logoUrl: 'https://token-icons.s3.amazonaws.com/eth.png',
  }),
)

export const uniCurrencyInfo = createFixture<CurrencyInfo>()(() =>
  currencyInfo({
    nativeCurrency: ZANJIR_CURRENCY,
    logoUrl:
      'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
  }),
)

export const daiCurrencyInfo = createFixture<CurrencyInfo>()(() =>
  currencyInfo({
    nativeCurrency: ZANJIR_CURRENCY,
    logoUrl:
      'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
  }),
)

export const ETH_CURRENCY_INFO = ethCurrencyInfo()
export const UNI_CURRENCY_INFO = uniCurrencyInfo()
export const DAI_CURRENCY_INFO = daiCurrencyInfo()

export const removeSafetyInfo = (item: Maybe<CurrencyInfo>): Maybe<CurrencyInfo> => {
  if (!item) {
    return item
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { safetyInfo: _, ...rest } = item
  return rest
}
