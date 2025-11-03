import React from 'react'

interface ButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    text: string
}

export const Button = ({ onClick, text }: ButtonProps) => {
    return (
        <button
            className="border border-white text-white px-4 py-1 rounded-md hover:bg-purple-500 cursor-pointer"
            onClick={onClick}
        >
            {text}
        </button>
    )
}
