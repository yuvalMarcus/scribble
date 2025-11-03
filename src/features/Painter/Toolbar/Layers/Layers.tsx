import type { Canvas } from 'fabric'
import { useState, type RefObject } from 'react'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { Layer } from './Layer/Layer'
import type { FabricObjectWithData } from '../../Painter.type'
import usePaint from '../../../../context/PaintContext'

interface LayersProps {
    canvas: RefObject<Canvas | null>
}

export const Layers = ({ canvas }: LayersProps) => {
    const [objectsIds, setObjectsIds] = useState<string[]>(
        canvas.current
            ?.getObjects()
            .map((object) => (object as FabricObjectWithData).data.id) ?? []
    )

    const { addHistory } = usePaint()

    const handleDragEnd = (event: DragEndEvent) => {
        if (!event.over) return

        if (event.active.id !== event.over.id) {
            const oldIdx = objectsIds.findIndex(
                (id) => id === event.active.id.toString()
            )
            const newIdx = objectsIds.findIndex(
                (id) => id === event.over!.id.toString()
            )

            const sortObjects = arrayMove(objectsIds, oldIdx, newIdx)

            const objects = canvas.current?.getObjects()

            const backgroundColor = canvas.current?.backgroundColor

            addHistory(JSON.stringify(canvas.current?.toJSON()))

            canvas.current?.clear()

            sortObjects.forEach((id) => {
                const object = objects?.find(
                    (object) => (object as FabricObjectWithData).data.id === id
                )
                if (object) canvas.current?.add(object)
            })

            canvas.current?.set('backgroundColor', backgroundColor)

            canvas?.current?.renderAll()

            setObjectsIds(sortObjects)
        }
    }

    const objects = canvas.current?.getObjects()

    return (
        <div
            className="flex flex-col gap-4 p-2"
            onMouseDown={(event) => event.stopPropagation()}
        >
            <p className="font-bold text-xl">Layers:</p>
            {objects?.length ? (
                <div className="flex flex-col gap-1 border-2 border-gray-600 border-dashed p-2">
                    <DndContext onDragEnd={handleDragEnd}>
                        <SortableContext items={objectsIds}>
                            {objects?.map((object) => (
                                <Layer
                                    key={
                                        (object as FabricObjectWithData).data.id
                                    }
                                    object={object as FabricObjectWithData}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            ) : (
                <p className="text-gray-600">No objects on the scribble</p>
            )}
        </div>
    )
}
