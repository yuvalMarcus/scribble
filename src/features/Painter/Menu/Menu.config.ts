import type { RefObject } from 'react'
import { Canvas as FabricCanvas } from 'fabric'
import { FileDropdown } from './components/FileDropdown'

export enum MENU_DROPDOWN {
    FILE = 'file',
}

export const menuDropdown: Record<
    MENU_DROPDOWN,
    React.ComponentType<{ canvas: RefObject<FabricCanvas | null> }>
> = {
    [MENU_DROPDOWN.FILE]: FileDropdown,
}
