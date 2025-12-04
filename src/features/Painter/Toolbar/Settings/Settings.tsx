import { useState, type RefObject } from 'react'
import { Canvas } from 'fabric'
import { HexColorPicker } from 'react-colorful'

interface SettingsProps {
    canvas: RefObject<Canvas | null>
}

export const Settings = ({ canvas }: SettingsProps) => {
    const [backgroundColor, setBackgroundColor] = useState<string>(
        (canvas.current?.backgroundColor ?? '#ffffff') as string
    )

    const handleUpdateColor = (color: string): void => {
        canvas.current?.set('backgroundColor', color)
        canvas.current?.renderAll()
        setBackgroundColor(color)
    }

    return (
        <div className="flex flex-col gap-4 p-2">
            <p className="font-bold text-xl">Setting:</p>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                    <p className="font-bold text-xl">Background Color:</p>
                    <div
                        className="w-5 h-5 border-4 border-gray-300 rounded-md"
                        style={{
                            backgroundColor,
                        }}
                    />
                </div>
                <div onMouseDown={(event) => event.stopPropagation()}>
                    <HexColorPicker
                        color={backgroundColor}
                        onChange={handleUpdateColor}
                    />
                </div>
            </div>
        </div>
    )
}
