import { createContext, useContext, useState, type FC } from 'react'
import history from '../features/Painter/classes/History'
import type {
    PaintContext as PaintContextType,
    PaintProvider as PaintProviderType,
} from './PaintContext.type'

const PaintContext = createContext<PaintContextType>({
    addHistory: () => {},
    redo: () => null,
    undo: () => null,
    isCanRedo: false,
    isCanUndo: false,
})

export const PaintProvider: FC<PaintProviderType> = ({ children }) => {
    const [isCanRedo, setIsCanRedo] = useState<boolean>(false)
    const [isCanUndo, setIsCanUndo] = useState<boolean>(false)

    const addHistory = (json: string): void => {
        history.add(json)

        setIsCanRedo(history.isCanRedo())
        setIsCanUndo(history.isCanUndo())
    }

    const redo = (): string | null => {
        const json = history.redo() ?? null

        setIsCanUndo(history.isCanUndo())
        setIsCanRedo(history.isCanRedo())

        return json
    }

    const undo = (): string | null => {
        const json = history.undo() ?? null

        setIsCanRedo(history.isCanRedo())
        setIsCanUndo(history.isCanUndo())

        return json
    }

    return (
        <PaintContext.Provider
            value={{
                addHistory,
                redo,
                undo,
                isCanRedo,
                isCanUndo,
            }}
        >
            {children}
        </PaintContext.Provider>
    )
}

const usePaint = () => useContext(PaintContext)

// eslint-disable-next-line react-refresh/only-export-components
export default usePaint
