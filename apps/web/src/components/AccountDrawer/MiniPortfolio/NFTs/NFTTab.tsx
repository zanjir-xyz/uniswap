import { NFT } from 'components/AccountDrawer/MiniPortfolio/NFTs/NFTItem'
import { DEFAULT_NFT_QUERY_AMOUNT } from 'components/AccountDrawer/MiniPortfolio/constants'
import { useAccountDrawer } from 'components/AccountDrawer/MiniPortfolio/hooks'
import { TabButton } from 'components/AccountDrawer/MiniPortfolio/shared'
import { useNftBalance } from 'graphql/data/nft/NftBalance'
import styled from 'lib/styled-components'
import { LoadingAssets } from 'nft/components/collection/CollectionAssetLoading'
import { EmptyWalletModule } from 'nft/components/profile/view/EmptyWalletContent'
import { useProfilePageState, useSellAsset, useWalletCollections } from 'nft/hooks'
import { ProfilePageStateType } from 'nft/types'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import { Gallery } from 'ui/src/components/icons/Gallery'
import { Chain } from 'uniswap/src/data/graphql/uniswap-data-api/__generated__/types-and-hooks'
import { useEnabledChains } from 'uniswap/src/features/chains/hooks/useEnabledChains'
import { FeatureFlags } from 'uniswap/src/features/gating/flags'
import { useFeatureFlag } from 'uniswap/src/features/gating/hooks'

const StyledTabButton = styled(TabButton)`
  width: calc(100% - 32px);
  margin: 0 16px -4px;
`

export default function NFTs({ account }: { account: string }) {

  return (
    <>
    </>
  )
}

const AssetsContainer = styled.div`
  display: grid;
  gap: 12px;

  // use minmax to not let grid items escape the parent container
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  margin: 16px;
`
