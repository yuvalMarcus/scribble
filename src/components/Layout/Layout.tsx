import { Outlet } from 'react-router'
import { Header } from '../Header/Header'

export const Layout = () => {
    return (
        <div className="flex flex-col bg-gray-100 h-full">
            <Header />
            <div className="flex flex-1">
                <Outlet />
            </div>
        </div>
    )
}
