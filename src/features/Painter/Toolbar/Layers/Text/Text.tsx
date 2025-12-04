import type { FabricText } from 'fabric'

interface TextProps {
    object: FabricText
}

export const Text = ({ object }: TextProps) => {
    return (
        <p className="truncate" style={{ color: object.fill as string }}>
            {object.text}
        </p>
    )
}
