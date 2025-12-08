import { useLayoutEffect, type FC } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

const schema = z.object({
    file: z.instanceof(File),
})

const MAX_SIZE = 5000000

interface UploadPhotoModalProps {
    label?: string
    onUploadFile: (file: File) => Promise<void>
    accept: Record<string, string[]>
    isLoading?: boolean
    onClose: () => void
}

export const UploadPhotoModal: FC<UploadPhotoModalProps> = ({
    label = 'photo',
    onUploadFile,
    accept,
    isLoading,
    onClose,
}) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        multiple: false,
        accept,
        maxSize: MAX_SIZE,
    })

    const {
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    })

    useLayoutEffect(() => {
        if (!acceptedFiles.length) return

        setValue('file', acceptedFiles[0])

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acceptedFiles])

    const file = watch('file')
    const hasFileError = errors?.['file'] && !file

    const onSubmit = async ({ file }: { file: File }) => {
        await onUploadFile(file)

        onClose()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <p className="capitalize">{`upload ${label}:`}</p>
                    <p className="capitalize bold">
                        max size: {MAX_SIZE / 1000000}MB
                    </p>
                </div>
                <div
                    className={clsx(
                        'flex flex-col items-center gap-2 border-4 border-dotted border-gray-400 bg-gray-200 cursor-pointer p-4 dropzone',
                        {
                            'border-red-700': hasFileError,
                        }
                    )}
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    <ArrowUpOnSquareIcon className="size-12 stroke-gray-700" />
                    <p className="text-gray-700">{`Drag 'n' drop some ${label} here, or click to select ${label}`}</p>
                </div>
                {hasFileError && (
                    <p className="text-red-700">Photo is required</p>
                )}
                <div>
                    {file && (
                        <div className="flex flex-row gap-1">
                            <p className="bold">File: </p>
                            <p className="text-green-600">
                                {(file as File).name}
                            </p>
                        </div>
                    )}
                    {!file && (
                        <p className="text-gray-600">{`No ${label} selected to upload`}</p>
                    )}
                </div>
                <button
                    className="bg-blue-500 disabled:bg-gray-500 text-white w-full px-4 py-2 rounded-md cursor-pointer capitalize"
                    disabled={isLoading}
                    type="submit"
                >
                    upload
                </button>
            </div>
        </form>
    )
}
