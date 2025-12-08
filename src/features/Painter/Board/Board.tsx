import {
    type Dispatch,
    type FC,
    type RefObject,
    type SetStateAction,
} from 'react'
import { Canvas as FabricCanvas } from 'fabric'
import { Actions } from '../Actions'
import { ToolBar } from '../Toolbar'
import { ACTION_TYPE } from '../paint.config'

interface BoardProps {
    controller: RefObject<HTMLDivElement | null>
    canvas: RefObject<FabricCanvas | null>
    objectId: string | null
    setSelectedObjectId: Dispatch<SetStateAction<string | null>>
    selectedAction: ACTION_TYPE | null
    setSelectedAction: Dispatch<SetStateAction<ACTION_TYPE | null>>
}

export const Board: FC<BoardProps> = ({
    controller,
    canvas,
    objectId,
    setSelectedObjectId,
    selectedAction,
    setSelectedAction,
}) => {
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
