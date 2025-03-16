import { Currency, Token } from '@uniswap/sdk-core'
import { DoubleCurrencyLogo } from 'components/Logo/DoubleLogo'
import { useCurrencyInfo } from 'hooks/Tokens'
import { mocked } from 'test-utils/mocked'
import { render } from 'test-utils/render'
import { Flex } from 'ui/src'
import { UNI, WBTC } from 'uniswap/src/constants/tokens'
import { SafetyLevel } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'
import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { getCurrencySafetyInfo } from 'uniswap/src/features/dataApi/utils'

jest.mock('hooks/Tokens', () => ({
  useCurrencyInfo: jest.fn(),
}))

describe('DoubleLogo', () => {
  const mockCurrency1: Token = {
    isToken: true,
    chainId: UniverseChainId.Zanjir,
    address: UNI[UniverseChainId.Zanjir].address,
    symbol: UNI[UniverseChainId.Zanjir].symbol,
    name: UNI[UniverseChainId.Zanjir].name,
    decimals: UNI[UniverseChainId.Zanjir].decimals,
  } as Token

  const mockCurrency2: Token = {
    isToken: true,
    chainId: UniverseChainId.Zanjir,
    address: WBTC.address,
    symbol: WBTC.symbol,
    name: WBTC.name,
    decimals: WBTC.decimals,
  } as Token

  beforeEach(() => {
    mocked(useCurrencyInfo).mockImplementation((currency: Currency | string | undefined) => {
      if (typeof currency === 'string' || currency?.isNative) {
        return undefined
      }

      if (currency?.address === mockCurrency1.address) {
        return {
          currency: mockCurrency1,
          logoUrl:
            'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
          currencyId: UNI[UniverseChainId.Zanjir].address,
          safetyInfo: getCurrencySafetyInfo(SafetyLevel.Verified, undefined),
        }
      }

      if (currency?.address === mockCurrency2.address) {
        return {
          currency: mockCurrency2,
          logoUrl:
            'https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x2260fac5e5542a773aa44fbcfeDf7c193bc2c599/logo.png',
          currencyId: WBTC.address,
          safetyInfo: getCurrencySafetyInfo(SafetyLevel.Verified, undefined),
        }
      }

      return undefined
    })
  })

  it('renders with two valid currencies', () => {
    const { asFragment } = render(<DoubleCurrencyLogo currencies={[mockCurrency1, mockCurrency2]} size={32} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with one valid and one undefined currency', () => {
    const { asFragment } = render(<DoubleCurrencyLogo currencies={[mockCurrency1, undefined]} size={32} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with two undefined currencies', () => {
    const { asFragment } = render(<DoubleCurrencyLogo currencies={[undefined, undefined]} size={32} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with custom size', () => {
    const { asFragment } = render(<DoubleCurrencyLogo currencies={[mockCurrency1, mockCurrency2]} size={48} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with custom icon', () => {
    const { asFragment } = render(
      <DoubleCurrencyLogo
        currencies={[mockCurrency1, mockCurrency2]}
        size={32}
        customIcon={<Flex data-testid="custom-icon">Custom Icon</Flex>}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
