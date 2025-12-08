import { Menu } from './Menu'
import { Canvas as FabricCanvas, FabricObject } from 'fabric'
import { initPaint } from './paint.utils.ts'
import { useLayoutEffect, useRef, useState, type FC } from 'react'
import { Board } from './Board'
import { handleDrawingPath } from './Toolbar/Draw/draw.utils'
import type { ACTION_TYPE } from './paint.config.ts'
import usePaint from '../../context/PaintContext'
import type { FabricObjectWithData } from './Painter.type'

FabricObject.ownDefaults.objectCaching = false
FabricObject.customProperties = [
    'data',
    'hasBorders',
    'hasControls',
    'hasRotatingPoint',
    'lockMovementX',
    'lockMovementY',
    'selectable',
    'hoverCursor',
]

export const Painter: FC = () => {
    const [selectedObjectId, setSelectedObjectId] = useState<string | null>(
        null
    )
    const [selectedAction, setSelectedAction] = useState<ACTION_TYPE | null>(
        null
    )

    const controller = useRef<HTMLDivElement | null>(null)
    const canvas = useRef<FabricCanvas | null>(null)

    const { addHistory } = usePaint()

    useLayoutEffect(() => {
        if (!controller.current) return

        const rect = controller.current?.getBoundingClientRect()

        canvas.current = initPaint(rect.width, rect.height)

        canvas.current?.on('path:created', (event) => {
            handleDrawingPath(event)
            addHistory(JSON.stringify(canvas.current?.toJSON()))
        })

        canvas.current?.on('selection:created', (event) => {
            if (event.selected.length > 1) return

            setSelectedAction(null)
            setSelectedObjectId(
                (event.selected[0] as FabricObjectWithData).data.id
            )
        })

        canvas.current?.on('selection:updated', (event) => {
            if (event.selected.length > 1) return

            setSelectedAction(null)
            setSelectedObjectId(
                (event.selected[0] as FabricObjectWithData).data.id
            )
        })

        canvas.current?.on('selection:cleared', () => {
            setSelectedAction(null)
            setSelectedObjectId(null)
        })

        addHistory(JSON.stringify(canvas.current?.toJSON()))

        canvas.current?.renderAll()

        return () => {
            canvas.current?.dispose()
            canvas.current = null
        }
    }, [])

    const handleOpenEditor = (): void => {
        const object = canvas.current
            ?.getObjects()
            .find(
                (object) =>
                    (object as FabricObjectWithData).data?.id ===
                    selectedObjectId
            ) as FabricObjectWithData | null

        setSelectedAction(object?.data.category ?? null)
    }

    return (
        <div className="flex flex-col w-full bg-gray-100">
            <Menu
                canvas={canvas}
                objectId={selectedObjectId}
                openEditor={handleOpenEditor}
            />
            <Board
                controller={controller}
                canvas={canvas}
                objectId={selectedObjectId}
                setSelectedObjectId={setSelectedObjectId}
                selectedAction={selectedAction}
                setSelectedAction={setSelectedAction}
            />
        </div>
    )
}
