import type { FC } from 'react'

export const Header: FC = () => {
    return (
        <div className="bg-gray-900 text-white p-4 shadow-md flex justify-between items-center">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold capitalize">scribble</h1>
            </div>
        </div>
    )
}
