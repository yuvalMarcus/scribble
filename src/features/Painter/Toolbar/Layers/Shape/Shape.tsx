import type { FabricObjectWithData } from '../../../Painter.type'
import { mapShapeToIcon, SHAPE_TYPE } from './shape.config'

interface ShapeProps {
    object: FabricObjectWithData
}

export const Shape = ({ object }: ShapeProps) => {
    const type = object.data.shape as SHAPE_TYPE

    return mapShapeToIcon[type](object.fill as string)
}
