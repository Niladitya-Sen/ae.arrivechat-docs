"use client";

import React, { useState } from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { data, APIDataType, API } from '@/constants/data'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '../ui/button'
import { Input } from '../ui/input'
import { JetBrains_Mono } from 'next/font/google';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog"
import dynamic from 'next/dynamic';

const ReactJson = dynamic(() => import('@microlink/react-json-view'), { ssr: false });

const jetbrainsmono = JetBrains_Mono({
    style: "normal",
    weight: ["400", "600"],
    subsets: ["latin-ext"],
});

function APIItem(props: API & { setDialog: (value: boolean) => void }) {
    const color = {
        "GET": {
            primary: "bg-blue-500",
            secondary: "bg-blue-200"
        },
        "POST": {
            primary: "bg-green-500",
            secondary: "bg-green-200"
        },
        "PUT": {
            primary: "bg-yellow-500",
            secondary: "bg-yellow-200"
        },
        "DELETE": {
            primary: "bg-red-500",
            secondary: "bg-red-200",
        },
        "PATCH": {
            primary: "bg-purple-500",
            secondary: "bg-purple-200"
        },
    };

    return (
        <AccordionItem value={props.api} className={cn('mb-4 px-4 rounded-[0.5rem]', color[props.method].secondary)}>
            <AccordionTrigger className={cn('hover:no-underline', jetbrainsmono.className)}>
                <div className='flex items-center gap-4 text-base'>
                    <span className={cn(color[props.method].primary, 'min-w-[4rem] py-1 rounded-[0.5rem] font-semibold')}>{props.method}</span>
                    <p>{props.endpoint}</p>
                </div>
            </AccordionTrigger>
            <AccordionContent className={cn('flex flex-col gap-8')}>
                <p>{props.description}</p>
                <section className='flex flex-col gap-2 bg-white p-4 rounded-lg'>
                    <div className='flex items-center justify-between'>
                        <p className='text-lg font-semibold'>Params</p>
                        <Button
                            disabled={Object.keys(props.request.params).length === 0}
                            size={"sm"}
                            onClick={() => props.setDialog(true)}
                        >Try it out</Button>
                    </div>
                    {
                        Object.keys(props.request.params).length === 0 ? (
                            <p>No Params</p>
                        ) : (
                            Object.keys(props.request.params).map((param, index) => (
                                <label key={index} htmlFor={param} className={cn('flex gap-2 items-center', jetbrainsmono.className)}>
                                    <div className='flex flex-col'>
                                        <span>{param}:</span>
                                        <span className='font-semibold'>{props.request.params[param].type}</span>
                                    </div>
                                    <Input
                                        id={param}
                                        name={param}
                                        placeholder={props.request.params[param].description}
                                        className={cn('max-w-[20rem]')}
                                    />
                                </label>
                            ))
                        )
                    }
                </section>
                <section className='flex flex-col gap-2 bg-white p-4 rounded-lg'>
                    <div className='flex items-center justify-between'>
                        <p className='text-lg font-semibold'>Query</p>
                        <Button
                            disabled={Object.keys(props.request.query).length === 0}
                            size={"sm"}
                            onClick={() => props.setDialog(true)}
                        >Try it out</Button>
                    </div>
                    {
                        Object.keys(props.request.query).length === 0 ? (
                            <p>No Query</p>
                        ) : (
                            Object.keys(props.request.query).map((query, index) => (
                                <label key={index} htmlFor={query} className={cn('flex gap-2 items-center', jetbrainsmono.className)}>
                                    <div className='flex flex-col'>
                                        <span>{query}:</span>
                                        <span className='font-semibold'>{props.request.query[query].type}</span>
                                    </div>
                                    <Input
                                        id={query}
                                        name={query}
                                        placeholder={props.request.query[query].description}
                                        className={cn('max-w-[20rem]')}
                                    />
                                </label>
                            ))
                        )
                    }
                </section>
                <section className='flex flex-col gap-2 bg-white p-4 rounded-lg'>
                    <div className='flex flex-row items-start sm:items-center justify-between'>
                        <p className='text-lg font-semibold'>Body</p>
                        <div className='flex flex-col-reverse sm:flex-row items-end gap-4'>
                            <div className={cn('flex gap-2 items-center justify-center', {
                                'hidden': Object.keys(props.request.body).length === 0
                            })}>
                                <p>Request Content Type: </p>
                                <p className={cn(buttonVariants({
                                    size: "sm",
                                }), 'cursor-default', jetbrainsmono.className)}>application/json</p>
                            </div>
                            <Button
                                className={cn('w-fit')}
                                disabled={Object.keys(props.request.body).length === 0}
                                size={"sm"}
                                onClick={() => props.setDialog(true)}
                            >Try it out</Button>
                        </div>
                    </div>
                    {
                        Object.keys(props.request.body).length === 0 ? (
                            <p>No Body</p>
                        ) : (
                            <ReactJson
                                style={{
                                    padding: "1rem",
                                    borderRadius: "0.5rem",
                                    ...jetbrainsmono.style,
                                }}
                                src={props.request.body}
                                theme="ocean"
                                quotesOnKeys={false}
                                name={false}
                                onEdit={(edit) => {
                                    console.log(edit)
                                }}
                                enableClipboard={false}
                            />
                        )
                    }
                </section>
                <section className='flex flex-col gap-2 bg-white p-4 rounded-lg'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between'>
                        <p className='text-lg font-semibold'>Response</p>
                        <div className='flex gap-2 items-center justify-center'>
                            <p>Response Content Type: </p>
                            <p className={cn(buttonVariants({
                                size: "sm",
                            }), 'cursor-default', jetbrainsmono.className)}>{props.response.type}</p>
                        </div>
                    </div>
                    {
                        Object.keys(props.response.body).length === 0 ? (
                            <p>No Response</p>
                        ) : (
                            <ReactJson
                                style={{
                                    padding: "1rem",
                                    borderRadius: "0.5rem",
                                    ...jetbrainsmono.style,
                                }}
                                src={props.response.body}
                                theme="ocean"
                                quotesOnKeys={false}
                                name={false}
                                enableClipboard={false}
                            />
                        )
                    }
                </section>
            </AccordionContent>
        </AccordionItem>
    )
}

function APIHeading({ api, title, setDialog }: { api: API[], title: string, setDialog: (dialog: boolean) => void }) {
    return (
        <AccordionItem value={title}>
            <AccordionTrigger className={cn('hover:no-underline hover:bg-primary/10 px-4 rounded-[0.5rem]')}>{title}</AccordionTrigger>
            <AccordionContent>
                <Accordion type="multiple" className={cn('gap-4')}>
                    {
                        api.map((api, index) => (
                            <APIItem key={index} {...api} setDialog={setDialog} />
                        ))
                    }
                </Accordion>
            </AccordionContent>
        </AccordionItem>
    )
}

export default function Apis() {
    const [dialog, setDialog] = useState(false);

    return (
        <MaxWidthWrapper>
            <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription className={cn('text-black')}>
                            This feature is coming soon!
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            {/* <Accordion type="multiple" className={cn('gap-4')}>
                {
                    data.map((api, index) => (
                        <APIItem key={index} {...api} setDialog={setDialog} />
                    ))
                }
            </Accordion> */}
            <Accordion type='multiple' className={cn('gap-4')}>
                {
                    Object.keys(data).map((category, index) => (
                        <APIHeading key={index} title={category} api={data[category]} setDialog={setDialog} />
                    ))
                }
            </Accordion>
        </MaxWidthWrapper>
    )
}
