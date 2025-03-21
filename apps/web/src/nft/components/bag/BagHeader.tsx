import { OpacityHoverState } from 'components/Common/styles'
import styled from 'lib/styled-components'
import { BagCloseIcon } from 'nft/components/icons'
import { useMemo } from 'react'
import { Trans } from 'react-i18next'
import { ThemedText } from 'theme/components'
import { Button } from 'ui/src'

const IconWrapper = styled.button`
  align-items: center;
  background-color: transparent;
  border-radius: 8px;
  border: none;
  color: ${({ theme }) => theme.neutral1};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-left: auto;
  padding: 2px;
  opacity: 1;

  ${OpacityHoverState}
`
const CounterDot = styled.div<{ sizing: string }>`
  align-items: center;
  background-color: ${({ theme }) => theme.accent1};
  border-radius: 100px;
  font-weight: bold;
  color: ${({ theme }) => theme.deprecated_accentTextLightPrimary};
  display: flex;
  font-size: 10px;
  justify-content: center;
  min-width: ${({ sizing }) => sizing};
  min-height: ${({ sizing }) => sizing};
  padding: 4px 6px;
`
const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: flex-start;
  margin: 16px 28px;
  text-align: center;
`
interface BagHeaderProps {
  numberOfAssets: number
  closeBag: () => void
  resetFlow: () => void
  isProfilePage: boolean
}

const BASE_SIZING = 17
const INCREMENTAL_SIZING = 6

const getCircleSizing = (numberOfAssets: number): string => {
  const numberOfCharacters = numberOfAssets.toString().length

  // each digit adds 6px worth of width (approximately), so I set the height and width to be 6px larger for each digit added
  // 1 digit => 14 + 6, 2 digit 14 + 12, etc.
  return `${BASE_SIZING + INCREMENTAL_SIZING * numberOfCharacters}px`
}

export const BagHeader = ({ numberOfAssets, closeBag, resetFlow, isProfilePage }: BagHeaderProps) => {
  const sizing = useMemo(() => getCircleSizing(numberOfAssets), [numberOfAssets])

  return (
    <Wrapper>
      <ThemedText.HeadlineSmall>
        {isProfilePage ? <Trans i18nKey="common.sell.label" /> : <Trans i18nKey="nft.bag" />}
      </ThemedText.HeadlineSmall>
      {numberOfAssets > 0 && (
        <>
          <CounterDot sizing={sizing}>{numberOfAssets}</CounterDot>
          <Button fill={false} emphasis="text-only" onPress={resetFlow}>
            <Trans i18nKey="tokens.selector.button.clear" />
          </Button>
        </>
      )}
      <IconWrapper onClick={closeBag}>
        <BagCloseIcon data-testid="nft-bag-close-icon" />
      </IconWrapper>
    </Wrapper>
  )
}
