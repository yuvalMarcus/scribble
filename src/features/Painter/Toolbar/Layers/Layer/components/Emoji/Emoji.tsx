import type { FabricImage } from 'fabric'
import type { FC } from 'react'

interface EmojiProps {
    object: FabricImage
}

export const Emoji: FC<EmojiProps> = ({ object }) => {
    return <img className="w-10 h-10 -ml-2" src={object.getSrc()} />
}
