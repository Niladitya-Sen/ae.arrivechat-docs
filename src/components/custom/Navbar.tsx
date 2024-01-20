"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Search } from 'lucide-react'
import Link from 'next/link';

export default function Navbar() {
    const [search, setSearch] = useState('');
    const [hidden, setHidden] = useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleSearch = () => {
        console.log(search);
    }

    return (
        <nav className='dark bg-background sticky top-0 z-20'>
            <MaxWidthWrapper className='flex items-center gap-8'>
                <Link href="/" className='flex gap-3 items-center justify-center'>
                    <Image
                        src='/assets/icon.jpg'
                        alt='Arrive Chat'
                        width={50}
                        height={50}
                        className='object-cover object-center'
                    />
                    <div className='flex flex-col'>
                        <h1 className='text-white text-xl'>Arrive Chat</h1>
                        <p className='text-white text-xs'>by WaysAHeadGlobal</p>
                    </div>
                </Link>
                <div className='flex-grow-[0.3]'></div>
                <search className='flex-grow flex gap-2 justify-end relative isolate' onChange={handleChange}>
                    <Input
                        type='text'
                        placeholder='Search...'
                        className={cn('bg-white text-black w-full', {
                            'hidden sm:block': hidden,
                            'block absolute top-12 w-[15rem]': !hidden
                        })}
                    />
                    <Button className={cn('hidden sm:block')} variant={'secondary'} onClick={handleSearch}>Explore</Button>
                    <Button className={cn('block sm:hidden')} variant={'secondary'} onClick={() => setHidden(!hidden)}>
                        <Search size={20} />
                    </Button>
                </search>
            </MaxWidthWrapper>
        </nav>
    )
}
