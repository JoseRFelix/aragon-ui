import React from 'react'
import PropTypes from 'prop-types'
import { GU, RADIUS, textStyle } from '../../style'
import { useTheme } from '../../theme/Theme'
import { useLayout } from '../Layout/Layout'

function Box({ heading, children, padding, ...props }) {
  const theme = useTheme()
  const { layoutName } = useLayout()
  const fullWidth = layoutName === 'small'

  return (
    <div
      as={heading ? 'section' : 'div'}
      css={`
        position: relative;
        border-radius: ${fullWidth ? 0 : RADIUS}px;
        border-style: solid;
        border-color: ${theme.border};
        border-width: ${fullWidth ? '1px 0' : '1px'};
        background: ${theme.surface};
        color: ${theme.surfaceContent};
        & + & {
          margin-top: ${2 * GU}px;
        }
      `}
      {...props}
    >
      {heading && (
        <div
          css={`
            display: flex;
            align-items: center;
            height: ${4 * GU}px;
            border-bottom: 1px solid ${theme.border};
          `}
        >
          <HeaderContent heading={heading} />
        </div>
      )}
      <div
        css={`
          padding: ${padding ? 2 * GU : 0}px;
        `}
      >
        <div>{children}</div>
      </div>
    </div>
  )
}

Box.propTypes = {
  heading: PropTypes.node,
  children: PropTypes.node,
  padding: PropTypes.bool,
}

Box.defaultProps = {
  padding: true,
}

function HeaderContent({ heading }) {
  const theme = useTheme()

  if (!heading) {
    return null
  }

  if (typeof heading !== 'string') {
    return heading
  }

  return (
    <h1
      css={`
        padding-left: ${2 * GU}px;
        color: ${theme.surfaceContentSecondary};
        ${textStyle('label2')};
      `}
    >
      {heading}
    </h1>
  )
}

HeaderContent.propTypes = {
  heading: PropTypes.node,
}

export { Box }
export default Box