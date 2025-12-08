import {
    useCallback,
    useEffect,
    useState,
    type FC,
    type RefObject,
} from 'react'
import { Canvas as FabricCanvas } from 'fabric'
import { Button } from './components/Button'
import { MENU_DROPDOWN, menuDropdown } from './Menu.config'
import type { FabricObjectWithData } from '../Painter.type'
import { HelpModal } from './components/HelpModal'
import { Tools } from './components/Tools'
import { History } from './components/History'

interface MenuProps {
    canvas: RefObject<FabricCanvas | null>
    objectId: string | null
    openEditor: () => void
}

export const Menu: FC<MenuProps> = ({ canvas, objectId, openEditor }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false)
    const [type, setType] = useState<MENU_DROPDOWN | null>(null)
    const [left, setLeft] = useState<number>(0)

    const handleOpenOption = (
        event: React.MouseEvent<HTMLButtonElement>,
        type: MENU_DROPDOWN
    ): void => {
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

    const handleClickOutside = useCallback((): void => {
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
        <>
            <div>
                <div className="bg-purple-800 p-4 shadow-md flex items-center justify-between">
                    <div className="flex flex-row gap-4">
                        <Button
                            text="File"
                            onClick={(event) =>
                                handleOpenOption(event, MENU_DROPDOWN.FILE)
                            }
                        />
                        <Button
                            text="Help"
                            onClick={() => setIsHelpOpen(true)}
                        />
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <Tools
                            canvas={canvas}
                            object={object}
                            openEditor={openEditor}
                        />
                        <History canvas={canvas} />
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
            {isHelpOpen && <HelpModal onClose={() => setIsHelpOpen(false)} />}
        </>
    )
}
