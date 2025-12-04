import { createPortal } from 'react-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface HelpModalProps {
    onClose: () => void
}

export const HelpModal = ({ onClose }: HelpModalProps) => {
    return createPortal(
        <div
            className="flex items-center justify-center absolute w-full h-full top-0 left-0 bg-gray-900/60 z-10"
            onClick={onClose}
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
                <p className="font-bold text-lg">
                    Online Painter that gives you the ability to edit and create
                    images with a variety of options
                </p>
                <p className="text-lg">
                    - Drawing with 3 types of brushes, with a choice of size
                    andcolor
                </p>
                <p className="text-lg">
                    - Adding text with options such as color, size, style
                </p>
                <p className="text-lg">
                    - Adding a smiley from a variety of options
                </p>
                <p className="text-lg">- Adding an image</p>
                <p className="text-lg">- Managing layers</p>
                <p className="text-lg">- Settings</p>
                <p className="text-lg">
                    Each element can be edited or deleted and moved on the board
                </p>
                <p className="text-lg">
                    When finished, you can save the drawing to your computer or
                    download it as an image file
                </p>
            </div>
        </div>,
        document.body
    )
}
