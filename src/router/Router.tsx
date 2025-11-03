import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from '../components/Layout/Layout'
import { Painter } from '../features/Painter/Painter'
import { PaintProvider } from '../context/PaintContext'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <PaintProvider>
                        <Painter />
                    </PaintProvider>
                ),
            },
        ],
    },
])

const Router = () => <RouterProvider router={router} />

export default Router
