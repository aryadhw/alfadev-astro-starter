import React from 'react'
import type { IconProps } from 'react-feather'
import * as Icon from 'react-feather'

type Props = IconProps & { name?: string }

/**
 * Wrapper that normalizes a passed icon name to the PascalCase export used by react-feather.
 */
export default function FeatherIcon(props: Props) {
  const { name, ...rest } = props

  if (!name) return null

  // strip leading underscore (used in your codebase) and normalize to PascalCase
  const raw = name.startsWith('_') ? name.substring(1) : name
  const normalized = String(raw)
    .replace(/[^a-z0-9]+/gi, ' ') // replace non-alnum with space
    .split(/\s+/)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ''))
    .join('')

  const IconComponent = (Icon as any)[normalized]

  if (!IconComponent) {
    // icon not found — avoid rendering undefined
    return null
  }

  return <IconComponent {...rest} />
}
