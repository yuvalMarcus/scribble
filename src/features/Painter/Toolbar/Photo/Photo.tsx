import { useState, type FC, type RefObject } from 'react'
import { FabricImage, type Canvas } from 'fabric'
import { v4 as uuidv4 } from 'uuid'
import { UploadPhotoModal } from '../../../../components/UploadPhotoModal/UploadPhotoModal'
import usePaint from '../../../../context/PaintContext'

interface PhotoProps {
    canvas: RefObject<Canvas | null>
    onClose: () => void
}

export const Photo: FC<PhotoProps> = ({ canvas, onClose }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { addHistory } = usePaint()

    const handleCreatePhoto = async (file: File): Promise<void> => {
        setIsLoading(true)

        const objectURL = URL.createObjectURL(file)
        const img = await FabricImage.fromURL(objectURL)

        img.scaleToWidth(400)
        // @ts-expect-error: 'data' is a custom property for our app
        img.data = {
            id: uuidv4(),
            category: 'photo',
        }

        canvas.current?.add(img)
        canvas.current?.centerObject(img)
        addHistory(JSON.stringify(canvas.current?.toJSON()))
        canvas.current?.renderAll()

        setIsLoading(false)
        onClose()
    }

    return (
        <div className="flex flex-col gap-4 p-2">
            <p className="font-bold text-xl capitalize">photo:</p>
            <UploadPhotoModal
                label="photo"
                accept={{ 'image/jpeg': [], 'image/png': [] }}
                onUploadFile={handleCreatePhoto}
                isLoading={isLoading}
                onClose={onClose}
            />
        </div>
    )
}
