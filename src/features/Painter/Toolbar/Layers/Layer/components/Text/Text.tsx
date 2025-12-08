import type { FabricText } from 'fabric'
import type { FC } from 'react'

interface TextProps {
    object: FabricText
}

export const Text: FC<TextProps> = ({ object }) => {
    return (
        <p className="truncate" style={{ color: object.fill as string }}>
            {object.text}
        </p>
    )
}
