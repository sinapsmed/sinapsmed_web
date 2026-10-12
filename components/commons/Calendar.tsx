'use client'
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useLocale, useTranslations } from 'next-intl';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import 'dayjs/locale/az'
import 'dayjs/locale/en'
import 'dayjs/locale/ru'

interface Props {
    availableSet: Set<string>,
    onChange: (value: string) => void,
    value: string|null
    activeDates: Set<string>
}

const Calendar = ({ availableSet, onChange, value, activeDates }: Props) => {
    const t = useTranslations('')
    const locale = useLocale()

    const months = t.raw('date.months')
    const [display, setDisplay] = useState(() => {
        return Array.from({ length: 7 }, (_, i) => {
            const date = dayjs().add(i - 3, 'day').locale(locale);
            return date;
        });
    });
    const [direction, setDirection] = useState<"left" | "right">("right");

    const getLabel = () => {
        const date = display[3];
        return `${months[date.month()]} ${date.year()}`
    }

    const changeDisplay = (left: boolean) => {
        setDirection(left ? "left" : "right");
        const referenceDate = left ? display[0] : display[display.length - 1];
        const shift = left ? -7 : 1;
        const dates = Array.from({ length: 7 }, (_, i) =>
            referenceDate.add(shift + i, 'day').locale(locale)
        );
        setDisplay(dates);
    };

    const variants = {
        enter: (direction: "left" | "right") => ({
            x: direction === "right" ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.3 }
        },
        exit: (direction: "left" | "right") => ({
            x: direction === "right" ? -300 : 300,
            opacity: 0,
            transition: { duration: 0.3 }
        })
    };

    const disabledToPast = display[3].format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")
    return (
        <div className='p-3 overflow-hidden'>
            <div className='flex gap-2 items-center'>
                <button
                    onClick={() => changeDisplay(true)}
                    disabled={disabledToPast}
                    className='p-2'
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <h1 className='text-center flex-1 text-xl font-semibold opacity-90'>
                    {getLabel()}
                </h1>
                <button
                    onClick={() => changeDisplay(false)}
                    className='p-2'
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <div className='relative h-[100px]'>
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={display[0].format("YYYY-MM-DD")}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.7}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = Math.abs(offset.x) * velocity.x;
                            if (swipe < -1000) {
                                changeDisplay(false);
                            } else if (swipe > 1000 && !disabledToPast) {
                                changeDisplay(true);
                            }
                        }}
                        className='absolute py-5 top-0 left-0 right-0 grid gap-2 grid-cols-7'
                    >
                        {
                            display.map((d, index) => {
                                const weekDay = d.format('ddd')
                                const day = d.date()
                                const formatted = d.format('YYYY-MM-DD')
                                const active = formatted === value
                                const selected = activeDates.has(formatted)
                                const today = formatted === dayjs().format('YYYY-MM-DD')
                                return (
                                    <div onClick={() => onChange?.(formatted)} key={index} className='group flex flex-col relative items-center cursor-pointer'>
                                        {
                                            availableSet.has(formatted) && <span className='text-blue-500 absolute -top-4'>•</span>
                                        }
                                        <h1 className={`${active ? 'font-semibold' : ''}`}>{weekDay}</h1>
                                        <div className={`mt-2 rounded-full w-10 h-10 ${selected?'bg-blue-500 text-white': active ? 'bg-blue-500/60 text-white font-semibold' : today? 'border border-blue-500/50': 'group-hover:border border-blue-500/50'} flex flex-center`}>{day}</div>
                                    </div>
                                )
                            })
                        }
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Calendar
