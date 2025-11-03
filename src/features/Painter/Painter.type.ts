import type { FabricImage, FabricObject, FabricText } from 'fabric'
import type { ACTION_TYPE } from './paint.config'
import type { SHAPE_TYPE } from './Toolbar/Shape/shape.config'

export interface FabricObjectWithData extends FabricObject {
    data: {
        id: string
        category: ACTION_TYPE
        shape?: SHAPE_TYPE
    }
}

export interface FabricTextWithData extends FabricText {
    data: {
        id: string
        category: ACTION_TYPE
    }
}

export interface FabricImageWithData extends FabricImage {
    data: {
        id: string
        category: ACTION_TYPE
    }
}
