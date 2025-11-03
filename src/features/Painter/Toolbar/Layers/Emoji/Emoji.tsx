import type { FabricImage } from 'fabric'

interface EmojiProps {
    object: FabricImage
}

export const Emoji = ({ object }: EmojiProps) => {
    return <img className="w-10 h-10 -ml-2" src={object.getSrc()} />
}
