'use client'
import { FAQ } from '@/types/faq'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React, { useState } from 'react'

interface Props {
    data: FAQ[]
}

const FAQList = ({ data }: Props) => {
    const [expanded, setExpanded] = useState(0)
    return (
        <div className='space-y-4'>
            {
                data.map((faq,index) => (
                    <Accordion expanded={expanded === index} key={index} className='shadow-none' onChange={() => setExpanded(index)}>
                        <AccordionSummary
                            expandIcon={<FontAwesomeIcon className='text-black' icon={faCaretDown} />}
                            aria-controls={`faq${index}-content`}
                            id={`faq${index}-header`}
                            className='bg-[#F6F6F6] font-semibold text-lg'
                        >
                            {faq.title}
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='remove-tailwind' dangerouslySetInnerHTML={{__html: faq.description}}>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))
            }

        </div>
    )
}

export default FAQList