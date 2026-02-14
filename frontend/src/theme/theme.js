// theme.js

import { createSystem, defaultConfig } from "@chakra-ui/react"

const systemTheme = createSystem(defaultConfig, {
    theme:{
        tokens: {
            colors: {
                primary : {
                    // Brand color: #f77518

                    100: { value: '#feecd9' },
                    200: { value: '#fddab0' },
                    300: { value: '#fcbf80' },
                    400: { value: '#fa9e4d' },
                    500: { value: '#F77518' }, // Principal color
                    600: { value: '#cc5d10' }, // Hover State
                    700: { value: '#99430a' },
                    800: { value: '#662c05' },
                    900: { value: '#331502' },
                },

                secondary: {
                    50: { value: '#f8fafc' },
                    100: { value: '#f1f5f9' }, // Input disable
                    200: { value: '#e2e8f0' }, // Subtle borders
                    300: { value: '#cbd5e1' }, // Inactive icons
                    400: { value: '#94a3b8' }, // Secondary text
                    500: { value: '#64748b' },
                    600: { value: '#475569' },
                    700: { value: '#334155' },
                    800: { value: '#1E293B' }, // Secondary color
                    900: { value: '#0f172a' }, // Text
                }
            },
        }
    },

    globalCss: {
        "html, body": {
            bg: "secondary.50",
            color: "secondary.900",
            fontFamily: "Inter, sans-serif",
        }
    }
})

export default systemTheme
