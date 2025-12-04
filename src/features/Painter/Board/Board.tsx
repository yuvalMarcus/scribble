import { type RefObject } from 'react'
import { Canvas as FabricCanvas } from 'fabric'
import { Actions } from '../Actions/Actions'
import { ToolBar } from '../Toolbar/ToolBar'
import { ACTION_TYPE } from '../paint.config'

interface BoardProps {
    controller: RefObject<HTMLDivElement | null>
    canvas: RefObject<FabricCanvas | null>
    objectId: string | null
    setSelectedObjectId: React.Dispatch<React.SetStateAction<string | null>>
    selectedAction: ACTION_TYPE | null
    setSelectedAction: React.Dispatch<React.SetStateAction<ACTION_TYPE | null>>
}

export const Board = ({
    controller,
    canvas,
    objectId,
    setSelectedObjectId,
    selectedAction,
    setSelectedAction,
}: BoardProps) => {
    const handleActionChange = (action: ACTION_TYPE): void => {
        canvas.current?.discardActiveObject()
        canvas.current?.requestRenderAll()
        setSelectedObjectId(null)
        setSelectedAction(action)
    }

    return (
        <div className="flex flex-1 flex-row">
            <Actions action={selectedAction} onChange={handleActionChange} />
            <div
                ref={controller}
                className="relative flex flex-1 items-center justify-center overflow-hidden"
            >
                <canvas id="paint" />
                {selectedAction && (
                    <ToolBar
                        canvas={canvas}
                        objectId={objectId}
                        action={selectedAction}
                        onClose={() => setSelectedAction(null)}
                    />
                )}
            </div>
        </div>
    )
}
