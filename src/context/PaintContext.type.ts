import type { ReactNode } from 'react'

export interface PaintContext {
    addHistory: (json: string) => void
    redo: () => string | null
    undo: () => string | null
    isCanRedo: boolean
    isCanUndo: boolean
}

export interface PaintProvider {
    children: ReactNode
}
