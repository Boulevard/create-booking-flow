import { PaletteOptions } from '@mui/material/styles'
import { Colors } from './enums/colors'

type Custom = Record<Colors, string>

declare module '@mui/material/styles' {
    export interface Palette {
        custom: Custom
    }

    export interface PaletteOptions {
        custom: Custom
    }
}
