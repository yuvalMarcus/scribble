import type { Canvas } from 'fabric'
import { FabricImage } from 'fabric'
import { useState, type RefObject } from 'react'
import emojis from './openmoji.json'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import usePaint from '../../../../context/PaintContext'
import type { Emoji as EmojiType } from './Emoji.type'
import { Image } from './Image/image'

interface EmojiProps {
    canvas: RefObject<Canvas | null>
    onClose: () => void
}

export const Emoji = ({ canvas, onClose }: EmojiProps) => {
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] =
        useState<string>('smileys-emotion')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const { addHistory } = usePaint()

    const handleCreateEmoji = async () => {
        setIsLoading(true)

        const img = await FabricImage.fromURL(`emojis/${selectedEmoji}.png`)

        img.scaleToWidth(200)
        // @ts-expect-error: 'data' is a custom property for our app
        img.data = {
            id: uuidv4(),
            category: 'emoji',
        }

        canvas.current?.add(img)
        canvas.current?.centerObject(img)
        addHistory(JSON.stringify(canvas.current?.toJSON()))
        canvas.current?.renderAll()

        setIsLoading(false)
        onClose()
    }

    const emojisHash = (emojis as EmojiType[]).reduce(
        (prev, emoji) => {
            if (!prev[emoji.group]) {
                prev[emoji.group] = []
            }

            prev[emoji.group].push(emoji)

            return prev
        },
        {} as Record<string, EmojiType[]>
    )

    return (
        <div className="flex flex-col gap-4 p-2">
            <p className="font-bold text-xl capitalize">emojis:</p>
            <div onMouseDown={(e) => e.stopPropagation()}>
                <input
                    type="text"
                    placeholder="Search Emoji"
                    className="w-full p-2 rounded-md bg-gray-100 border border-gray-300"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="flex flex-row gap-4">
                <div>
                    {Object.keys(emojisHash).map((category) => (
                        <div
                            key={category}
                            className={clsx(
                                'p-2 rounded-md hover:bg-purple-500 hover:text-white transition-colors duration-300 cursor-pointer',
                                {
                                    'bg-purple-400 text-white':
                                        selectedCategory === category,
                                }
                            )}
                            onClick={() => setSelectedCategory(category)}
                        >
                            <p className="font-bold capitalize">
                                {category.replace('-', ' ')}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="w-70 h-120 overflow-y-scroll">
                    <div className="flex flex-row gap-2 flex-wrap">
                        {emojisHash[selectedCategory]
                            .filter(({ tags }) => tags.includes(search))
                            .map(({ hexcode }) => (
                                <Image
                                    key={hexcode}
                                    hexcode={hexcode}
                                    selectedEmoji={selectedEmoji}
                                    onSelectedEmoji={setSelectedEmoji}
                                />
                            ))}
                    </div>
                </div>
            </div>
            <div>
                <button
                    className="bg-blue-500 disabled:bg-gray-500 text-white w-full px-4 py-2 rounded-md cursor-pointer capitalize"
                    disabled={isLoading}
                    onClick={handleCreateEmoji}
                >
                    add emoji
                </button>
            </div>
        </div>
    )
}
