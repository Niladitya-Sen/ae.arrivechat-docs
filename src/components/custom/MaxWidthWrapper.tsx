import { cn } from '@/lib/utils'
import React from 'react'

export default function MaxWidthWrapper({ children, className }: Readonly<{ children: React.ReactNode, className?: string }>) {
    return (
        <section className={cn('max-w-screen-2xl mx-auto px-4 sm:px-8 py-4', className)}>{children}</section>
    )
}
