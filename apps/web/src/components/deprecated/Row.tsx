import styled from 'lib/styled-components'
import { Box } from 'rebass/styled-components'
import { Gap } from 'theme'

// TODO(WEB-1983):
// Setting `width: 100%` by default prevents composability in complex flex layouts.
// Same applies to `RowFixed` and its negative margins. This component needs to be
// further investigated and improved to make UI work easier.
/** @deprecated Please use `Flex` from `ui/src` going forward */
const Row = styled(Box)<{
  width?: string
  align?: string
  justify?: string
  padding?: string
  border?: string
  borderRadius?: string
  gap?: Gap | string
}>`
  width: ${({ width }) => width ?? '100%'};
  display: flex;
  padding: 0;
  align-items: ${({ align }) => align ?? 'center'};
  justify-content: ${({ justify }) => justify ?? 'flex-start'};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  gap: ${({ gap, theme }) => gap && (theme.grids[gap as Gap] || gap)};
`

/** @deprecated Please use `Flex` from `ui/src` going forward */
export const RowBetween = styled(Row)`
  justify-content: space-between;
`

/** @deprecated Please use `Flex` from `ui/src` going forward */
export const AutoRow = styled(Row)<{ gap?: string; justify?: string }>`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};

  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`

/** @deprecated Please use `Flex` from `ui/src` going forward */
export const RowFixed = styled(Row)<{ gap?: string; justify?: string }>`
  position: relative;
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`

export default Row
