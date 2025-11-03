import type { ForwardRefExoticComponent, SVGProps } from 'react'
import {
    PaintBrushIcon,
    ChatBubbleBottomCenterTextIcon,
    RectangleGroupIcon,
    FaceSmileIcon,
    PhotoIcon,
    Bars3Icon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline'

export enum ACTION_TYPE {
    DRAW = 'draw',
    TEXT = 'text',
    SHAPE = 'shape',
    EMOJI = 'emoji',
    PHOTO = 'photo',
    LAYERS = 'layers',
    SETTINGS = 'settings',
}

export const mapActionToIcon: Record<
    ACTION_TYPE,
    ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'>>
> = {
    [ACTION_TYPE.DRAW]: PaintBrushIcon,
    [ACTION_TYPE.TEXT]: ChatBubbleBottomCenterTextIcon,
    [ACTION_TYPE.SHAPE]: RectangleGroupIcon,
    [ACTION_TYPE.EMOJI]: FaceSmileIcon,
    [ACTION_TYPE.PHOTO]: PhotoIcon,
    [ACTION_TYPE.LAYERS]: Bars3Icon,
    [ACTION_TYPE.SETTINGS]: Cog6ToothIcon,
}
