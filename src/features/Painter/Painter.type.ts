import type { FabricObject } from 'fabric'
import type { ACTION_TYPE } from './paint.config'
import type { SHAPE_TYPE } from './Toolbar/Shape/shape.config'

export interface FabricObjectWithData extends FabricObject {
    data: {
        id: string
        category: ACTION_TYPE
        shape?: SHAPE_TYPE
    }
}
