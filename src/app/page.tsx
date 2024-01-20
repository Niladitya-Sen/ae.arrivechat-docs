"use client";

import Apis from '@/components/custom/Apis'
import Auth from '@/components/custom/Auth'
import MaxWidthWrapper from '@/components/custom/MaxWidthWrapper'
import Navbar from '@/components/custom/Navbar'
import React from 'react'

export default function Home() {
    return (
        <React.Fragment>
            <Navbar />
            <main>
                <MaxWidthWrapper className='p-12'>
                    <h1 className='text-3xl tracking-wider font-semibold text-gray-700'>Arrive Chat APIs</h1>
                    <p className='mt-5 max-w-md'>Welcome to the Arrive Chat APIs documentation. You can use our APIs to access Arrive Chat API endpoints, which can get information on various topics.</p>
                </MaxWidthWrapper>
                <Auth />
                <Apis />
            </main>
        </React.Fragment>
    )
}
