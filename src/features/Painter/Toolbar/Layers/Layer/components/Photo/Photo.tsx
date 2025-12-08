import type { FabricImage } from 'fabric'
import type { FC } from 'react'

interface EmojiProps {
    object: FabricImage
}

export const Photo: FC<EmojiProps> = ({ object }) => {
    return <img className="w-10 h-10 ml-0.5" src={object.getSrc()} />
}
