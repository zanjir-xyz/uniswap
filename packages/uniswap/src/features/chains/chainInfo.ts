/* eslint-disable max-lines */
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { CurrencyAmount, ChainId as UniswapSDKChainId } from '@uniswap/sdk-core'

import {
  ARBITRUM_LOGO,
  AVALANCHE_LOGO,
  BASE_LOGO,
  BLAST_LOGO,
  BNB_LOGO,
  CELO_LOGO,
  ETHEREUM_LOGO,
  ETH_LOGO,
  MONAD_LOGO,
  OPTIMISM_LOGO,
  POLYGON_LOGO,
  SONEIUM_LOGO,
  UNICHAIN_LOGO,
  UNICHAIN_SEPOLIA_LOGO,
  WORLD_CHAIN_LOGO,
  ZKSYNC_LOGO,
  ZORA_LOGO,
} from 'ui/src/assets'
import { config } from 'uniswap/src/config'
import {
  USDC_ZANJIR,
} from 'uniswap/src/constants/tokens'
import { Chain as BackendChainId } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'
import {
  GqlChainId,
  NetworkLayer,
  RPCType,
  RetryOptions,
  UniverseChainId,
  UniverseChainInfo,
} from 'uniswap/src/features/chains/types'
import { ElementName } from 'uniswap/src/features/telemetry/constants'
import { ONE_MINUTE_MS } from 'utilities/src/time/time'

import {arbitrum} from "wagmi/chains"

const LOCAL_MAINNET_PLAYWRIGHT_RPC_URL = 'http://127.0.0.1:8545'
const LOCAL_BASE_PLAYWRIGHT_RPC_URL = 'http://127.0.0.1:8546'

/** Address that represents native currencies on ETH, Arbitrum, etc. */
export const DEFAULT_NATIVE_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
export const DEFAULT_RETRY_OPTIONS: RetryOptions = { n: 10, minWait: 250, maxWait: 1000 }

export const DEFAULT_MS_BEFORE_WARNING = ONE_MINUTE_MS * 10

export function getChainInfo(chainId: UniverseChainId): UniverseChainInfo {
  return UNIVERSE_CHAIN_INFO[chainId]
}

// Source: https://marketplace.quicknode.com/chains_and_networks
export function getQuicknodeChainId(chainId: UniverseChainId): string {
  return ''
}

// If chain requires a path suffix
export function getQuicknodeChainIdPathSuffix(chainId: UniverseChainId): string {
  return ''
}

export function getQuicknodeEndpointUrl(chainId: UniverseChainId): string {
  const quicknodeChainId = getQuicknodeChainId(chainId)

  return `https://${config.quicknodeEndpointName}${quicknodeChainId ? `.${quicknodeChainId}` : ''}.quiknode.pro/${config.quicknodeEndpointToken}${getQuicknodeChainIdPathSuffix(chainId)}`
}

function getPlaywrightRpcUrls(url: string): { [key in RPCType]: { http: string[] } } {
  return {
    [RPCType.Public]: { http: [url] },
    [RPCType.Default]: { http: [url] },
    [RPCType.Fallback]: { http: [url] },
    [RPCType.Interface]: { http: [url] },
    [RPCType.Private]: { http: [url] },
    [RPCType.PublicAlt]: { http: [url] },
  }
}

export const UNIVERSE_CHAIN_INFO: Record<UniverseChainId, UniverseChainInfo> = {
  [UniverseChainId.Zanjir]: {
    id: UniverseChainId.Zanjir,
    sdkId: UniswapSDKChainId.ZANJIR,
    assetRepoNetworkName: 'zanjir',
    backendChain: {
      chain: BackendChainId.Zanjir as GqlChainId,
      backendSupported: true,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 46,
    blockWaitMsBeforeWarning: DEFAULT_MS_BEFORE_WARNING,
    bridge: 'https://zanjir.xyz/',
    docs: 'https://zanjir.xyz/',
    elementName: ElementName.ChainArbitrum,
    explorer: {
      name: 'Zanjir Explorer',
      url: 'https://zanjir.xyz/explorer/',
      apiURL: 'https://zanjir.xyz/explorer',
    },
    helpCenterUrl: 'https://zanjir.xyz',
    infoLink: 'https://zanjir.xyz',
    infuraPrefix: 'zanjir-mainnet',
    interfaceName: 'zanjir',
    label: 'Zanjir',
    logo: ARBITRUM_LOGO,
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      address: DEFAULT_NATIVE_ADDRESS,
      explorerLink: 'https://zanjir.xyz/explorer',
      logo: ETH_LOGO,
    },
    networkLayer: NetworkLayer.L2,
    pendingTransactionsRetryOptions: DEFAULT_RETRY_OPTIONS,
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC_ZANJIR, 10_000e6),
    stablecoins: [USDC_ZANJIR],
    statusPage: undefined,
    supportsInterfaceClientSideRouting: true,
    supportsGasEstimates: true,
    supportsV4: true,
    urlParam: 'zanjir',
    rpcUrls: {
      [RPCType.Public]: { http: ['https://rpc.zanjir.xyz'] },
      [RPCType.Default]: { http: ['https://rpc.zanjir.xyz'] },
      [RPCType.Fallback]: { http: ['https://rpc.zanjir.xyz'] },
      [RPCType.Interface]: {
        http: ['https://rpc.zanjir.xyz'],
      },
      [RPCType.PublicAlt]: { http: ['https://rpc.zanjir.xyz'] },
    },
    wrappedNativeCurrency: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      address: '0xffffffffffffffffffffffffffffffffffffffff',
    },
  } as const satisfies UniverseChainInfo,
  [UniverseChainId.ZanjirTestnet]: {
    id: UniverseChainId.ZanjirTestnet,
    sdkId: UniswapSDKChainId.ZANJIR_TESTNET,
    assetRepoNetworkName: 'zanjir-testnet',
    backendChain: {
      chain: BackendChainId.ZanjirTestnet as GqlChainId,
      backendSupported: true,
      isSecondaryChain: false,
      nativeTokenBackendAddress: undefined,
    },
    blockPerMainnetEpochForChainId: 46,
    blockWaitMsBeforeWarning: DEFAULT_MS_BEFORE_WARNING,
    bridge: 'https://zanjir.xyz/',
    docs: 'https://zanjir.xyz/',
    elementName: ElementName.ChainArbitrum,
    explorer: {
      name: 'Zanjir Explorer',
      url: 'https://zanjir.xyz/explorer/',
      apiURL: 'https://zanjir.xyz/explorer',
    },
    helpCenterUrl: 'https://zanjir.xyz',
    infoLink: 'https://zanjir.xyz',
    infuraPrefix: 'zanjir-mainnet',
    interfaceName: 'zanjir',
    label: 'Zanjir',
    logo: ARBITRUM_LOGO,
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
      address: DEFAULT_NATIVE_ADDRESS,
      explorerLink: 'https://zanjir.xyz/explorer',
      logo: ETH_LOGO,
    },
    networkLayer: NetworkLayer.L2,
    pendingTransactionsRetryOptions: DEFAULT_RETRY_OPTIONS,
    spotPriceStablecoinAmount: CurrencyAmount.fromRawAmount(USDC_ZANJIR, 10_000e6),
    stablecoins: [USDC_ZANJIR],
    statusPage: undefined,
    supportsInterfaceClientSideRouting: true,
    supportsGasEstimates: true,
    supportsV4: true,
    urlParam: 'zanjir',
    rpcUrls: {
      [RPCType.Public]: { http: ['https://rpc.zanjir.xyz'] },
      [RPCType.Default]: { http: ['https://rpc.zanjir.xyz'] },
      [RPCType.Fallback]: { http: ['https://rpc.zanjir.xyz'] },
      [RPCType.Interface]: {
        http: ['https://rpc.zanjir.xyz'],
      },
      [RPCType.PublicAlt]: { http: ['https://rpc.zanjir.xyz'] },
    },
    wrappedNativeCurrency: {
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      address: '0xffffffffffffffffffffffffffffffffffffffff',
    },
  } as const satisfies UniverseChainInfo,
}

export const GQL_MAINNET_CHAINS = Object.values(UNIVERSE_CHAIN_INFO)
  .filter((chain) => !chain.testnet && !chain.backendChain.isSecondaryChain)
  .map((chain) => chain.backendChain.chain)
  .filter((backendChain) => !!backendChain)

export const GQL_TESTNET_CHAINS = Object.values(UNIVERSE_CHAIN_INFO)
  .filter((chain) => chain.testnet && !chain.backendChain.isSecondaryChain)
  .map((chain) => chain.backendChain.chain)
  .filter((backendChain) => !!backendChain)

export const ALL_GQL_CHAINS: GqlChainId[] = [...GQL_MAINNET_CHAINS, ...GQL_TESTNET_CHAINS]
