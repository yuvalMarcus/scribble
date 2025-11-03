import type { ReactNode } from 'react'

export enum SHAPE_TYPE {
    SQUARE = 'square',
    CIRCLE = 'circle',
    RECTANGLE = 'rectangle',
    TRIANGULAR = 'triangular',
}

export const mapShapeToIcon: Record<SHAPE_TYPE, ReactNode> = {
    [SHAPE_TYPE.SQUARE]: <div className="w-7.5 h-7.5 bg-gray-800" />,
    [SHAPE_TYPE.CIRCLE]: (
        <div className="w-7.5 h-7.5 rounded-full bg-gray-800" />
    ),
    [SHAPE_TYPE.RECTANGLE]: <div className="w-15 h-7.5 bg-gray-800" />,
    [SHAPE_TYPE.TRIANGULAR]: (
        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-gray-800" />
    ),
}
