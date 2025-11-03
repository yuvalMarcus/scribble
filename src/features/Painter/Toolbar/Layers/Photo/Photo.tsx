import type { FabricImage } from 'fabric'

interface EmojiProps {
    object: FabricImage
}

export const Photo = ({ object }: EmojiProps) => {
    return <img className="w-10 h-10 ml-0.5" src={object.getSrc()} />
}
