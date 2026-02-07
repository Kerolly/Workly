'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'
import systemTheme from "@/theme/theme.js";

export function Provider(props) {
  return (
    <ChakraProvider value={systemTheme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
