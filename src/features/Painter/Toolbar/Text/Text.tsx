import { useState, type ChangeEvent, type RefObject } from 'react'
import { Canvas, FabricText, IText } from 'fabric'
import { v4 as uuidv4 } from 'uuid'
import clsx from 'clsx'
import { HexColorPicker } from 'react-colorful'
import {
    BoldIcon,
    UnderlineIcon,
    ItalicIcon,
} from '@heroicons/react/24/outline'
import {
    DEFAULT_COLOR,
    DEFAULT_SIZE,
    FONT_STYLE,
    FONT_WEIGHT,
    TEXT_DECORATION,
} from './text.config.ts'
import type { FabricObjectWithData } from '../../Painter.type.ts'
import usePaint from '../../../../context/PaintContext.tsx'

interface TextProps {
    canvas: RefObject<Canvas | null>
    objectId: string | null
    onClose: () => void
}

const Text = ({ canvas, objectId, onClose }: TextProps) => {
    const object = canvas.current
        ?.getObjects()
        .find(
            (object) => (object as FabricObjectWithData).data?.id === objectId
        ) as FabricText | null

    const [fontWeight, setFontWeight] = useState<FONT_WEIGHT>(
        object?.fontWeight === FONT_WEIGHT.BOLD
            ? FONT_WEIGHT.BOLD
            : FONT_WEIGHT.NORMAL
    )
    const [textDecoration, setTextDecoration] = useState<TEXT_DECORATION>(
        object?.underline ? TEXT_DECORATION.UNDERLINE : TEXT_DECORATION.NONE
    )
    const [fontStyle, setFontStyle] = useState<FONT_STYLE>(
        object?.fontStyle === FONT_STYLE.ITALIC
            ? FONT_STYLE.ITALIC
            : FONT_STYLE.NORMAL
    )
    const [size, setSize] = useState<number>(object?.fontSize ?? DEFAULT_SIZE)
    const [color, setColor] = useState<string>(
        (object?.fill as string) ?? DEFAULT_COLOR
    )

    const isBold = fontWeight === FONT_WEIGHT.BOLD
    const isUnderline = textDecoration === TEXT_DECORATION.UNDERLINE
    const isItalic = fontStyle === FONT_STYLE.ITALIC

    const { addHistory } = usePaint()

    const handleUpdateFontWeight = (): void => {
        const fontWeight = isBold ? FONT_WEIGHT.NORMAL : FONT_WEIGHT.BOLD
        setFontWeight(fontWeight)

        if (!object) return

        object.set({
            fontWeight,
        })
        object?.setCoords()

        addHistory(JSON.stringify(canvas.current?.toJSON()))
        canvas.current?.renderAll()
    }

    const handleUpdateTextDecoration = (): void => {
        setTextDecoration(
            isUnderline ? TEXT_DECORATION.NONE : TEXT_DECORATION.UNDERLINE
        )

        if (!object) return

        object.set({
            underline: !isUnderline,
        })
        object?.setCoords()

        addHistory(JSON.stringify(canvas.current?.toJSON()))
        canvas.current?.renderAll()
    }

    const handleUpdateFontStyle = (): void => {
        const fontStyle = isItalic ? FONT_STYLE.NORMAL : FONT_STYLE.ITALIC
        setFontStyle(fontStyle)

        if (!object) return

        object.set({
            fontStyle,
        })
        object?.setCoords()

        addHistory(JSON.stringify(canvas.current?.toJSON()))
        canvas.current?.renderAll()
    }

    const handleUpdateSize = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = +event.target.value || 1
        setSize(value)

        if (!object) return

        object.set({
            fontSize: value,
        })
        object?.setCoords()

        addHistory(JSON.stringify(canvas.current?.toJSON()))
        canvas.current?.renderAll()
    }

    const handleUpdateColor = (color: string): void => {
        setColor(color)

        if (!object) return

        object?.set({
            fill: color,
        })
        object?.setCoords()

        addHistory(JSON.stringify(canvas.current?.toJSON()))
        canvas.current?.renderAll()
    }

    const handleCreateText = (): void => {
        const newId = uuidv4()

        const newText = new IText('Text', {
            textAlign: 'center',
            fontSize: size,
            fill: color,
            editable: true,
            fontWeight,
            underline: isUnderline,
            fontStyle,
            data: {
                id: newId,
                category: 'text',
            },
        })

        canvas.current?.add(newText)
        canvas.current?.centerObject(newText)
        addHistory(JSON.stringify(canvas.current?.toJSON()))
        canvas.current?.renderAll()

        onClose()
    }

    return (
        <div className="flex flex-col gap-4 p-2">
            <div className="flex flex-col gap-2">
                <p className="font-bold text-xl capitalize">font style:</p>
                <div className="flex flex-row gap-4 justify-between">
                    <button
                        className={clsx(
                            'py-2 px-2 rounded-md hover:bg-purple-500 hover:text-white transition-colors duration-300 cursor-pointer',
                            {
                                'bg-purple-400 text-white': isBold,
                            }
                        )}
                        onClick={handleUpdateFontWeight}
                    >
                        <BoldIcon className="size-6" />
                    </button>
                    <button
                        className={clsx(
                            'py-2 px-2 rounded-md hover:bg-purple-500 hover:text-white transition-colors duration-300 cursor-pointer',
                            {
                                'bg-purple-400 text-white': isUnderline,
                            }
                        )}
                        onClick={handleUpdateTextDecoration}
                    >
                        <UnderlineIcon className="size-6" />
                    </button>
                    <button
                        className={clsx(
                            'py-2 px-2 rounded-md hover:bg-purple-500 hover:text-white transition-colors duration-300 cursor-pointer',
                            {
                                'bg-purple-400 text-white': isItalic,
                            }
                        )}
                        onClick={handleUpdateFontStyle}
                    >
                        <ItalicIcon className="size-6" />
                    </button>
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
                        min="20"
                        max="200"
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
            {!object && (
                <div>
                    <button
                        className="bg-blue-500 text-white w-full px-4 py-2 rounded-md capitalize"
                        onClick={handleCreateText}
                    >
                        add text
                    </button>
                </div>
            )}
        </div>
    )
}

export default Text
