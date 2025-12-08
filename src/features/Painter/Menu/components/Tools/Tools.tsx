import type { FC, RefObject } from 'react'
import { Canvas as FabricCanvas } from 'fabric'
import { ACTION_TYPE } from '../../../paint.config'
import type { FabricObjectWithData } from '../../../Painter.type'
import usePaint from '../../../../../context/PaintContext'

const canEdit = [ACTION_TYPE.TEXT, ACTION_TYPE.SHAPE]

interface ToolsProps {
    canvas: RefObject<FabricCanvas | null>
    object: FabricObjectWithData | null
    openEditor: () => void
}

export const Tools: FC<ToolsProps> = ({ canvas, object, openEditor }) => {
    const { addHistory } = usePaint()

    const handleRemoveObject = (): void => {
        if (!object) return

        canvas.current?.remove(object)
        addHistory(JSON.stringify(canvas.current?.toJSON()))
        canvas.current?.renderAll()
    }

    return (
        <>
            {object && (
                <>
                    {canEdit.includes(object.data.category) && (
                        <button
                            className="bg-sky-500 text-white px-4 py-1 rounded-md shadow-md capitalize cursor-pointer"
                            onClick={openEditor}
                        >
                            edit
                        </button>
                    )}
                    <button
                        className="bg-rose-500 text-white px-4 py-1 rounded-md shadow-md capitalize cursor-pointer"
                        onClick={handleRemoveObject}
                    >
                        remove
                    </button>
                </>
            )}
        </>
    )
}
