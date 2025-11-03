import { v4 as uuidv4 } from 'uuid'
import { Canvas, FabricObject } from 'fabric'
import {
    DEFAULT_COLOR,
    DEFAULT_SIZE,
    mapShapeToFabricObject,
    mapShapeToIcon,
    SHAPE_TYPE,
} from './shape.config.tsx'
import { useState, type ChangeEvent, type RefObject } from 'react'
import clsx from 'clsx'
import { HexColorPicker } from 'react-colorful'
import type { FabricObjectWithData } from '../../Painter.type.ts'
import usePaint from '../../../../context/PaintContext.tsx'

type FabricObjectWithSize = { size: number } & FabricObject

interface ShapeProps {
    canvas: RefObject<Canvas | null>
    objectId: string | null
    onClose: () => void
}

const Shape = ({ canvas, objectId, onClose }: ShapeProps) => {
    const object = canvas.current
        ?.getObjects()
        .find(
            (object) => (object as FabricObjectWithData).data?.id === objectId
        ) as FabricObjectWithSize | null

    const [selectedShape, setSelectedShape] = useState<SHAPE_TYPE>(
        SHAPE_TYPE.SQUARE
    )
    const [size, setSize] = useState<number>(object?.size ?? DEFAULT_SIZE)
    const [stroke, setStroke] = useState<string>(
        (object?.stroke as string) ?? DEFAULT_COLOR
    )
    const [fill, setFill] = useState<string>(
        (object?.fill as string) ?? DEFAULT_COLOR
    )

    const { addHistory } = usePaint()

    const handleUpdateSize = (event: ChangeEvent<HTMLInputElement>) => {
        const size = +event.target.value
        setSize(size)

        if (!object) return

        object.set({
            size,
        })
        object?.setCoords()

        addHistory(JSON.stringify(canvas.current?.toJSON()))

        canvas.current?.renderAll()
    }

    const handleUpdateStroke = (color: string) => {
        setStroke(color)

        if (!object) return

        object.set({
            stroke: color,
        })
        object?.setCoords()

        addHistory(JSON.stringify(canvas.current?.toJSON()))

        canvas.current?.renderAll()
    }

    const handleUpdateFill = (color: string) => {
        setFill(color)

        if (!object) return

        object.set({
            fill: color,
        })
        object?.setCoords()

        addHistory(JSON.stringify(canvas.current?.toJSON()))

        canvas.current?.renderAll()
    }

    const handleCreateShape = () => {
        const newId = uuidv4()

        const object = mapShapeToFabricObject[selectedShape](
            newId,
            fill,
            stroke,
            size
        )

        object.on('modified', () =>
            addHistory(JSON.stringify(canvas.current?.toJSON()))
        )

        canvas.current?.add(object)
        canvas.current?.centerObject(object)
        canvas.current?.renderAll()

        addHistory(JSON.stringify(canvas.current?.toJSON()))

        onClose()
    }

    return (
        <div className="flex flex-col gap-4 p-2">
            {!object && (
                <div className="flex flex-col gap-2">
                    <p className="font-bold text-xl capitalize">shapes:</p>
                    <div className="flex flex-row gap-4">
                        {Object.values(SHAPE_TYPE).map((shape: SHAPE_TYPE) => (
                            <div
                                key={shape}
                                className={clsx(
                                    'py-2 px-2 rounded-md hover:bg-purple-500 hover:text-white transition-colors duration-300 cursor-pointer',
                                    {
                                        'bg-purple-400':
                                            selectedShape === shape,
                                    }
                                )}
                            >
                                {mapShapeToIcon[shape](
                                    selectedShape === shape,
                                    () => setSelectedShape(shape)
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                    <p className="font-bold text-xl capitalize">stroke Size:</p>
                    <p className="text-gray-400">{size}px</p>
                </div>
                <div onMouseDown={(event) => event.stopPropagation()}>
                    <input
                        id="default-range"
                        type="range"
                        min="0"
                        max="100"
                        value={size}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-300"
                        onChange={handleUpdateSize}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                    <p className="font-bold text-xl capitalize">
                        stroke color:
                    </p>
                    <div
                        className="w-5 h-5 border-4 border-gray-300 rounded-md"
                        style={{ backgroundColor: stroke }}
                    />
                </div>
                <div onMouseDown={(event) => event.stopPropagation()}>
                    <HexColorPicker
                        color={stroke}
                        onChange={handleUpdateStroke}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                    <p className="font-bold text-xl capitalize">fill color:</p>
                    <div
                        className="w-5 h-5 border-4 border-gray-300 rounded-md"
                        style={{ backgroundColor: fill }}
                    />
                </div>
                <div onMouseDown={(event) => event.stopPropagation()}>
                    <HexColorPicker color={fill} onChange={handleUpdateFill} />
                </div>
            </div>
            {!object && (
                <div>
                    <button
                        className="bg-blue-500 text-white w-full px-4 py-2 rounded-md capitalize"
                        onClick={handleCreateShape}
                    >
                        add shape
                    </button>
                </div>
            )}
        </div>
    )
}

export default Shape
