import type { ReactNode } from 'react'
import {
    getCircle,
    getRectangle,
    getSquare,
    getTriangular,
} from './shape.utils.ts'
import { FabricObject } from 'fabric'
import clsx from 'clsx'

export enum SHAPE_TYPE {
    SQUARE = 'square',
    CIRCLE = 'circle',
    RECTANGLE = 'rectangle',
    TRIANGULAR = 'triangular',
}

export const mapShapeToIcon: Record<
    SHAPE_TYPE,
    (isSelected: boolean, onClick: () => void) => ReactNode
> = {
    [SHAPE_TYPE.SQUARE]: (isSelected, onClick) => (
        <div
            className={clsx('w-12.5 h-12.5 bg-gray-800', {
                'bg-white': isSelected,
            })}
            onClick={onClick}
        />
    ),
    [SHAPE_TYPE.CIRCLE]: (isSelected, onClick) => (
        <div
            className={clsx('w-12.5 h-12.5 rounded-full bg-gray-800', {
                'bg-white': isSelected,
            })}
            onClick={onClick}
        />
    ),
    [SHAPE_TYPE.RECTANGLE]: (isSelected, onClick) => (
        <div
            className={clsx('w-25 h-12.5 bg-gray-800', {
                'bg-white': isSelected,
            })}
            onClick={onClick}
        />
    ),
    [SHAPE_TYPE.TRIANGULAR]: (isSelected, onClick) => (
        <div
            className={clsx(
                'w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[50px] border-b-gray-800',
                {
                    'border-b-white': isSelected,
                }
            )}
            onClick={onClick}
        />
    ),
}

export const DEFAULT_SIZE = 1

export const DEFAULT_COLOR = '#212121'
export const mapShapeToFabricObject: Record<
    SHAPE_TYPE,
    (
        id: string,
        fill: string,
        stroke: string,
        strokeWidth: number
    ) => FabricObject
> = {
    [SHAPE_TYPE.SQUARE]: getSquare,
    [SHAPE_TYPE.CIRCLE]: getCircle,
    [SHAPE_TYPE.RECTANGLE]: getRectangle,
    [SHAPE_TYPE.TRIANGULAR]: getTriangular,
}
