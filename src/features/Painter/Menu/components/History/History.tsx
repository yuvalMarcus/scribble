import type { FC, RefObject } from 'react'
import { Canvas as FabricCanvas } from 'fabric'
import {
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon,
} from '@heroicons/react/24/outline'
import usePaint from '../../../../../context/PaintContext'

interface HistoryProps {
    canvas: RefObject<FabricCanvas | null>
}

export const History: FC<HistoryProps> = ({ canvas }) => {
    const { addHistory, redo, undo, isCanRedo, isCanUndo } = usePaint()

    const handleSetHistory = async (type: 'redo' | 'undo'): Promise<void> => {
        const json = type === 'redo' ? redo() : undo()

        if (!json) return

        canvas.current?.clear()
        await canvas.current?.loadFromJSON(JSON.parse(json))

        const objects = canvas.current?.getObjects()
        objects?.forEach((object) =>
            object.on('modified', () =>
                addHistory(JSON.stringify(canvas.current?.toJSON()))
            )
        )

        canvas.current?.renderAll()
    }

    return (
        <>
            {isCanUndo && (
                <button
                    className="flex flex-row gap-2 border border-white px-4 py-1 rounded-md hover:bg-purple-500 cursor-pointer"
                    onClick={() => handleSetHistory('undo')}
                >
                    <p className="text-white capitalize">undo</p>
                    <ArrowUturnLeftIcon className="size-6 text-white" />
                </button>
            )}
            {isCanRedo && (
                <button
                    className="flex flex-row gap-2 border border-white px-4 py-1 rounded-md hover:bg-purple-500 cursor-pointer"
                    onClick={() => handleSetHistory('redo')}
                >
                    <p className="text-white capitalize">redo</p>
                    <ArrowUturnRightIcon className="size-6 text-white" />
                </button>
            )}
        </>
    )
}
