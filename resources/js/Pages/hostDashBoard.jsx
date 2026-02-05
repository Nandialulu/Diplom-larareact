import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React from 'react';
import '../Pages/hostDashBoard.css';
import {Link} from '@inertiajs/react'
import Footer from '@/Components/Footer/Footer';
export default function HostDashboard() {
    return (
        <>
        <div className="h-16 bg-gray-100 shadow">
       <h1 className="Logo">Gerhub</h1> 
        </div>
        <div className="h-screen flex flex-col">
            <div className="flex flex-1">
        {/* Sidebar */}
            <div className="w-64 bg-gray-800">
                <Sidebar className='Sidebar'>
                    <Menu>
                        <MenuItem>
                        <Link href={'/Creat'}>Байр нэмэх</Link>
                        </MenuItem>
                    </Menu>
                </Sidebar>
            </div>
        <div className="flex-1 bg-gray-200 p-6">
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard" />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                You're logged in!
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            <Footer/>
        </div>
    </div>
</div>
        </>
    );
}
