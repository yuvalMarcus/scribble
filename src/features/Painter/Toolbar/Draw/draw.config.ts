import {
    PencilIcon,
    PaintBrushIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline'
import type { ForwardRefExoticComponent, SVGProps } from 'react'

export enum DRAW_TYPE {
    PENCIL = 'pencil',
    BRUSH = 'brush',
    SPRAY = 'spray',
}

export const mapDrawTypeToIcon: Record<
    DRAW_TYPE,
    ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'>>
> = {
    [DRAW_TYPE.PENCIL]: PencilIcon,
    [DRAW_TYPE.BRUSH]: PaintBrushIcon,
    [DRAW_TYPE.SPRAY]: SparklesIcon,
}
