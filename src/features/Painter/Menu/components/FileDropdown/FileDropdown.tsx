import { useState, type FC, type RefObject } from 'react'
import { Canvas as FabricCanvas } from 'fabric'
import { ImportPaintJson } from './ImportPaintJson/ImportPaintJson'

interface FileDropdownProps {
    canvas: RefObject<FabricCanvas | null>
}

export const FileDropdown: FC<FileDropdownProps> = ({ canvas }) => {
    const [isImportPaintOpen, setIsImportPaintOpen] = useState<boolean>(false)

    const handleSavePaint = async (): Promise<void> => {
        const dataURL = canvas.current?.toDataURL({
            format: 'png',
            quality: 1.0,
            multiplier: 1,
        })

        if (dataURL) {
            const tag = document.createElement('a')
            tag.href = dataURL
            tag.download = 'image.png'
            tag.click()
        }
    }

    const handleExportPaint = (): void => {
        const dataJson = canvas.current?.toJSON()

        if (dataJson) {
            const a = document.createElement('a')
            const file = new Blob([JSON.stringify(dataJson)], {
                type: 'text/plain',
            })
            a.href = URL.createObjectURL(file)
            a.download = 'paint.json'
            a.click()
        }
    }

    return (
        <>
            <div>
                <p
                    className="hover:bg-gray-100 cursor-pointer py-2 px-4 font-semibold capitalize"
                    onClick={handleSavePaint}
                >
                    save paint
                </p>
                <p
                    className="hover:bg-gray-100 cursor-pointer py-2 px-4 font-semibold capitalize"
                    onClick={() => setIsImportPaintOpen(true)}
                >
                    import paint
                </p>
                <p
                    className="hover:bg-gray-100 cursor-pointer py-2 px-4 font-semibold capitalize"
                    onClick={handleExportPaint}
                >
                    export paint
                </p>
            </div>
            {isImportPaintOpen && (
                <ImportPaintJson
                    canvas={canvas}
                    onClose={() => setIsImportPaintOpen(false)}
                />
            )}
        </>
    )
}
