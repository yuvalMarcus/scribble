import type { FC, MouseEvent } from 'react'

interface ButtonProps {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
    text: string
}

export const Button: FC<ButtonProps> = ({ onClick, text }) => {
    return (
        <button
            className="border border-white text-white px-4 py-1 rounded-md hover:bg-purple-500 cursor-pointer"
            onClick={onClick}
        >
            {text}
        </button>
    )
}
