import type { ReactNode } from 'react'

export enum SHAPE_TYPE {
    SQUARE = 'square',
    CIRCLE = 'circle',
    RECTANGLE = 'rectangle',
    TRIANGULAR = 'triangular',
}

export const mapShapeToIcon: Record<
    SHAPE_TYPE,
    (backgroundColor: string) => ReactNode
> = {
    [SHAPE_TYPE.SQUARE]: (backgroundColor: string) => (
        <div className="w-7.5 h-7.5 bg-gray-800" style={{ backgroundColor }} />
    ),
    [SHAPE_TYPE.CIRCLE]: (backgroundColor: string) => (
        <div
            className="w-7.5 h-7.5 rounded-full bg-gray-800"
            style={{ backgroundColor }}
        />
    ),
    [SHAPE_TYPE.RECTANGLE]: (backgroundColor: string) => (
        <div className="w-15 h-7.5 bg-gray-800" style={{ backgroundColor }} />
    ),
    [SHAPE_TYPE.TRIANGULAR]: (backgroundColor: string) => (
        <div
            className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-gray-800"
            style={{ backgroundColor }}
        />
    ),
}
