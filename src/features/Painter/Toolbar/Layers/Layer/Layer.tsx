import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Emoji } from './components/Emoji'
import { Text } from './components/Text'
import { ACTION_TYPE, mapActionToIcon } from '../../../paint.config'
import { Photo } from './components/Photo'
import { Shape } from './components/Shape'
import type {
    FabricImageWithData,
    FabricObjectWithData,
    FabricTextWithData,
} from '../../../Painter.type'
import { Draw } from './components/Draw'
import type { FC } from 'react'

interface LayerProps {
    object: FabricObjectWithData
}

export const Layer: FC<LayerProps> = ({ object }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: object.data.id })

    const Icon = mapActionToIcon[object.data.category as ACTION_TYPE]

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className="flex flex-row gap-4 h-12 items-center justify-between min-w-30 max-w-40 px-3 border-2 bg-gray-100 border-gray-400 rounded-md hover:bg-purple-500 hover:text-white transition-colors duration-300 cursor-pointer"
            style={{
                transform: CSS.Transform.toString(transform),
                transition: transition,
            }}
        >
            {object.data.category === 'draw' && <Draw />}
            {object.data.category === 'text' && (
                <Text object={object as FabricTextWithData} />
            )}
            {object.data.category === 'shape' && <Shape object={object} />}
            {object.data.category === 'emoji' && (
                <Emoji object={object as FabricImageWithData} />
            )}
            {object.data.category === 'photo' && (
                <Photo object={object as FabricImageWithData} />
            )}
            <div>
                <Icon className="size-6 stroke-gray-600" />
            </div>
        </div>
    )
}
