import { ACTION_TYPE, mapActionToIcon } from '../paint.config'
import clsx from 'clsx'

interface ActionsProps {
    action: ACTION_TYPE | null
    onChange: (action: ACTION_TYPE) => void
}

export const Actions = ({ action, onChange }: ActionsProps) => {
    return (
        <div className="flex flex-col gap-2 bg-gray-300 p-2 shadow-md">
            {Object.values(ACTION_TYPE).map((value) => {
                const Icon = mapActionToIcon[value]

                return (
                    <div
                        key={value}
                        className={clsx(
                            'flex items-center flex-col i py-2 px-4 rounded-md hover:bg-purple-500 hover:text-white transition-colors duration-300 cursor-pointer',
                            {
                                'bg-purple-400 text-white': action === value,
                            }
                        )}
                        onClick={() => onChange(value)}
                    >
                        <Icon className="size-10" />
                        <p className="text-center capitalize">{value}</p>
                    </div>
                )
            })}
        </div>
    )
}
