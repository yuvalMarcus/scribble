import { useCallback, useEffect, useState, type RefObject } from 'react'
import { Button } from './Button/Button'
import { Canvas as FabricCanvas } from 'fabric'
import { MENU_DROPDOWN, menuDropdown } from './Menu.config'
import {
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon,
} from '@heroicons/react/24/outline'
import type { FabricObjectWithData } from '../Painter.type'
import { ACTION_TYPE } from '../paint.config'
import usePaint from '../../../context/PaintContext'

const canEdit = [ACTION_TYPE.TEXT, ACTION_TYPE.SHAPE]

interface MenuProps {
    canvas: RefObject<FabricCanvas | null>
    objectId: string | null
    openEditor: () => void
}

export const Menu = ({ canvas, objectId, openEditor }: MenuProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [type, setType] = useState<MENU_DROPDOWN | null>(null)
    const [left, setLeft] = useState<number>(0)

    const { addHistory, redo, undo, isCanRedo, isCanUndo } = usePaint()

    const handleOpenOption = (
        event: React.MouseEvent<HTMLButtonElement>,
        type: MENU_DROPDOWN
    ) => {
        event.stopPropagation()
        const rect = event.currentTarget.getBoundingClientRect()
        setType(type)
        setLeft(rect.left)
        setIsOpen(true)
    }

    const object = canvas.current
        ?.getObjects()
        .find(
            (object) => (object as FabricObjectWithData).data?.id === objectId
        ) as FabricObjectWithData | null

    const handleRemoveObject = () => {
        if (!object) return

        canvas.current?.remove(object)
        addHistory(JSON.stringify(canvas.current?.toJSON()))
        canvas.current?.renderAll()
    }

    const handleSetHistory = async (type: 'redo' | 'undo') => {
        const json = type === 'redo' ? redo() : undo()

        if (!json) return

        canvas.current?.clear()
        await canvas.current?.loadFromJSON(JSON.parse(json))

        const objects = canvas.current?.getObjects()
        objects?.forEach((object) =>
            object.on('modified', () =>
                addHistory(JSON.stringify(canvas.current?.toJSON()))
            )
        )

        canvas.current?.renderAll()
    }

    const handleClickOutside = useCallback(() => {
        setIsOpen(false)
    }, [])

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [handleClickOutside])

    const Component = type && menuDropdown[type]

    return (
        <div>
            <div className="bg-purple-800 p-4 shadow-md flex items-center justify-between">
                <div className="flex flex-row gap-4">
                    <Button
                        text="File"
                        onClick={(event) =>
                            handleOpenOption(event, MENU_DROPDOWN.FILE)
                        }
                    />
                    <Button text="Help" onClick={() => {}} />
                </div>
                <div className="flex flex-row items-center gap-4">
                    {object && (
                        <>
                            {canEdit.includes(object.data.category) && (
                                <button
                                    className="bg-sky-500 text-white px-4 py-1 rounded-md shadow-md capitalize cursor-pointer"
                                    onClick={openEditor}
                                >
                                    edit
                                </button>
                            )}
                            <button
                                className="bg-rose-500 text-white px-4 py-1 rounded-md shadow-md capitalize cursor-pointer"
                                onClick={handleRemoveObject}
                            >
                                remove
                            </button>
                        </>
                    )}
                    {isCanUndo && (
                        <button
                            className="flex flex-row gap-2 border border-white px-4 py-1 rounded-md hover:bg-purple-500 cursor-pointer"
                            onClick={() => handleSetHistory('undo')}
                        >
                            <p className="text-white capitalize">undo</p>
                            <ArrowUturnLeftIcon className="size-6 text-white" />
                        </button>
                    )}
                    {isCanRedo && (
                        <button
                            className="flex flex-row gap-2 border border-white px-4 py-1 rounded-md hover:bg-purple-500 cursor-pointer"
                            onClick={() => handleSetHistory('redo')}
                        >
                            <p className="text-white capitalize">redo</p>
                            <ArrowUturnRightIcon className="size-6 text-white" />
                        </button>
                    )}
                </div>
            </div>
            <div className="relative">
                {isOpen && (
                    <div
                        className="flex flex-col bg-white shadow-md absolute -top-2 rounded-md overflow-hidden z-10"
                        style={{ left }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        {Component && <Component canvas={canvas} />}
                    </div>
                )}
            </div>
        </div>
    )
}
