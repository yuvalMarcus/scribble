import { Canvas } from 'fabric'

const BOARD_PADDING = 20

export const initPaint = (width: number, height: number) =>
    new Canvas('paint', {
        height: height - BOARD_PADDING,
        width: width - BOARD_PADDING,
        backgroundColor: '#fff',
        fireRightClick: true,
        fireMiddleClick: true,
        stopContextMenu: true,
    })
