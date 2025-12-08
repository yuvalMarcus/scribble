import { useState, type FC } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface ItemProps {
    hexcode: string
    selectedEmoji: string | null
    onSelectedEmoji: (hexcode: string) => void
}

export const Item: FC<ItemProps> = ({
    hexcode,
    selectedEmoji,
    onSelectedEmoji,
}) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    return (
        <div
            className={clsx(
                'relative w-14 h-14 p-1 rounded-md hover:bg-purple-500 hover:text-white transition-colors duration-300 cursor-pointer',
                {
                    'bg-purple-400 text-white': selectedEmoji === hexcode,
                }
            )}
            onClick={() => isLoaded && onSelectedEmoji(hexcode)}
        >
            <img
                className="w-full h-full"
                src={`emojis/${hexcode}.png`}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
            />
            {!isLoaded && (
                <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-300 rounded-md animate-pulse">
                    <PhotoIcon className="size-6 text-gray-400" />
                </div>
            )}
        </div>
    )
}
