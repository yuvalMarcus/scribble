import { type FC, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { Canvas as FabricCanvas } from 'fabric'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { UploadPhotoModal } from '../../../../../../components/UploadPhotoModal'

interface ImportPaintJsonProps {
    canvas: RefObject<FabricCanvas | null>
    onClose: () => void
}

export const ImportPaintJson: FC<ImportPaintJsonProps> = ({
    canvas,
    onClose,
}) => {
    const handleUploadFIle = async (file: File): Promise<void> => {
        const objectURL = await URL.createObjectURL(file)

        const response = await fetch(objectURL)
        const data = await response.json()

        canvas.current?.clear()
        await canvas.current?.loadFromJSON(data)
        canvas.current?.renderAll()
    }

    return createPortal(
        <div
            className="flex items-center justify-center absolute w-full h-full top-0 left-0 bg-gray-900/60 z-10"
            onClick={() => onClose()}
        >
            <div
                className="p-4 rounded-md shadow-md bg-gray-200"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex justify-end mb-2">
                    <button
                        className="bg-gray-300 cursor-pointer"
                        onClick={onClose}
                    >
                        <XMarkIcon className="size-6" />
                    </button>
                </div>
                <UploadPhotoModal
                    accept={{
                        'application/json': [],
                    }}
                    onUploadFile={handleUploadFIle}
                    onClose={onClose}
                />
            </div>
        </div>,
        document.body
    )
}
