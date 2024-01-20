import React from 'react'
import { Button } from '../ui/button'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Lock, Info } from 'lucide-react'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function Auth() {
    return (
        <div className='mt-8 shadow-[0_1px_2px_0_rgba(0,0,0,.15)] bg-[#fafafa] p-4'>
            <MaxWidthWrapper className='flex justify-end'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            Authorize
                            <Lock size={15} className='ml-2' />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader className={cn('flex flex-col items-start')}>
                            <DialogTitle className={cn('text-xl mb-4 flex items-start')}>Authorize</DialogTitle>
                            <h1>BearerAuth (api key)</h1>
                            <p>Name: Authorization</p>
                            <p>In: header</p>
                            <form className='w-full'>
                                <label htmlFor="auth" className='flex gap-2 items-start w-full'>
                                    <span className='mt-2'>Value:</span>
                                    <div className='w-full flex gap-2 flex-col'>
                                        <Input id="auth" required className={cn('w-full peer')} />
                                        <span className='self-start hidden peer-invalid:block peer-invalid:text-red-500'>
                                            <Info size={15} className='inline-block mr-1' />
                                            This field cannot be empty
                                        </span>
                                    </div>
                                </label>
                                <Button className='mt-4'>Authorize</Button>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </MaxWidthWrapper>
        </div>
    )
}
