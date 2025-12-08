import { type FC, type RefObject } from 'react'
import { Canvas as FabricCanvas } from 'fabric'
import { Draw } from './Draw/Draw'
import Text from './Text/Text'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Rnd } from 'react-rnd'
import { ACTION_TYPE } from '../paint.config'
import { Shape } from './Shape'
import { Settings } from './Settings'
import { Emoji } from './Emoji'
import { Photo } from './Photo'
import { Layers } from './Layers'

const rndDefault = {
    x: 16,
    y: 16,
    width: 'fit-content',
    height: 'fit-content',
}

interface ToolBarProps {
    canvas: RefObject<FabricCanvas | null>
    objectId: string | null
    action: ACTION_TYPE | null
    onClose: () => void
}

export const ToolBar: FC<ToolBarProps> = ({
    canvas,
    objectId,
    action,
    onClose,
}) => {
    return (
        <>
            <Rnd
                className="z-5"
                default={rndDefault}
                enableResizing={false}
                bounds="parent"
            >
                <div className="bg-gray-200 p-2 shadow-md rounded-md">
                    <div className="relative">
                        <div className="absolute w-full flex justify-end">
                            <button
                                className="bg-gray-300 cursor-pointer"
                                onClick={onClose}
                            >
                                <XMarkIcon className="size-6" />
                            </button>
                        </div>
                        {action === ACTION_TYPE.DRAW && (
                            <Draw canvas={canvas} />
                        )}
                        {action === ACTION_TYPE.TEXT && (
                            <Text
                                canvas={canvas}
                                objectId={objectId}
                                onClose={onClose}
                            />
                        )}
                        {action === ACTION_TYPE.SHAPE && (
                            <Shape
                                canvas={canvas}
                                objectId={objectId}
                                onClose={onClose}
                            />
                        )}
                        {action === ACTION_TYPE.EMOJI && (
                            <Emoji canvas={canvas} onClose={onClose} />
                        )}
                        {action === ACTION_TYPE.PHOTO && (
                            <Photo canvas={canvas} onClose={onClose} />
                        )}
                        {action === ACTION_TYPE.LAYERS && (
                            <Layers canvas={canvas} />
                        )}
                        {action === ACTION_TYPE.SETTINGS && (
                            <Settings canvas={canvas} />
                        )}
                    </div>
                </div>
            </Rnd>
        </>
    )
}
