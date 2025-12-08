import {
    useEffect,
    useState,
    type ChangeEvent,
    type FC,
    type RefObject,
} from 'react'
import { Canvas as FabricCanvas } from 'fabric'
import clsx from 'clsx'
import { HexColorPicker } from 'react-colorful'
import {
    drawingMode,
    setActionType,
    setBrushColor,
    setBrushSize,
} from './draw.utils.ts'
import { DRAW_TYPE, mapDrawTypeToIcon } from './draw.config.ts'

export const DEFAULT_SIZE = 10
export const DEFAULT_COLOR = '#000000'

interface DrawProps {
    canvas: RefObject<FabricCanvas | null>
}

export const Draw: FC<DrawProps> = ({ canvas }) => {
    const [selectedType, setSelectedType] = useState<DRAW_TYPE>(
        DRAW_TYPE.PENCIL
    )
    const [size, setSize] = useState<number>(DEFAULT_SIZE)
    const [color, setColor] = useState<string>(DEFAULT_COLOR)

    useEffect(() => {
        if (canvas.current) drawingMode(canvas.current, true)

        return () => {
            if (canvas.current) drawingMode(canvas.current, false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvas?.current])

    const handleUpdateType = (value: DRAW_TYPE): void => {
        setSelectedType(value)
        setActionType(canvas.current, value)
    }

    const handleUpdateSize = (event: ChangeEvent<HTMLInputElement>): void => {
        setSize(+event.target.value || 1)
        setBrushSize(canvas.current, +event.target.value || 1)
    }

    const handleUpdateColor = (color: string): void => {
        setColor(color)
        setBrushColor(canvas.current, color)
    }

    return (
        <div className="flex flex-col gap-4 p-2">
            <div className="flex flex-col gap-2">
                <p className="font-bold text-xl capitalize">type:</p>
                <div className="flex flex-row gap-4">
                    {Object.values(DRAW_TYPE).map((value) => {
                        const Icon = mapDrawTypeToIcon[value]

                        return (
                            <div
                                key={value}
                                className={clsx(
                                    'py-2 px-2 rounded-md hover:bg-purple-500 hover:text-white transition-colors duration-300 cursor-pointer',
                                    {
                                        'bg-purple-400 text-white':
                                            selectedType === value,
                                    }
                                )}
                                onClick={() =>
                                    handleUpdateType(value as DRAW_TYPE)
                                }
                            >
                                <Icon />
                                <p className="capitalize">{value}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                    <p className="font-bold text-xl capitalize">size:</p>
                    <p className="text-gray-400">{size}px</p>
                </div>
                <div onMouseDown={(event) => event.stopPropagation()}>
                    <input
                        id="default-range"
                        type="range"
                        min="1"
                        max="100"
                        value={size}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-300"
                        onChange={handleUpdateSize}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                    <p className="font-bold text-xl capitalize">color:</p>
                    <div
                        className="w-5 h-5 border-4 border-gray-300 rounded-md"
                        style={{ backgroundColor: color }}
                    />
                </div>
                <div onMouseDown={(event) => event.stopPropagation()}>
                    <HexColorPicker
                        color={color}
                        onChange={handleUpdateColor}
                    />
                </div>
            </div>
        </div>
    )
}
