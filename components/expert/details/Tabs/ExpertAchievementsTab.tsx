'use client'

import React, { useState } from 'react'
import { Grid, Modal, Box, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import { Achievements } from '@/types/expert'
import { useTranslations } from 'next-intl'

interface Props {
  achievements: Achievements[]
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 1000,
  bgcolor: '#fff',
  borderRadius: 8,
  boxShadow: 24,
  outline: 'none',
  p: 2,
}

const ExpertAchievementsTab = ({ achievements }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const t = useTranslations('expert.detail')

  const handleOpen = (index: number) => setOpenIndex(index)
  const handleClose = () => setOpenIndex(null)

  if (!achievements?.length) {
    return (
      <p className="text-slate-500 text-center py-4">
        {t('noEvents')}
      </p>
    )
  }

  return (
    <>
      <Grid container spacing={3}>
        {achievements.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <div
              onClick={() => handleOpen(index)}
              className="group relative bg-black border aspect-square overflow-hidden rounded-lg cursor-pointer"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-125 transition-all duration-300"
              />
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-black/0 text-white">
                  <div className="line-clamp-1 text-sm font-medium">{item.title}</div>
                </div>
              )}
            </div>
          </Grid>
        ))}
      </Grid>

      <Modal open={openIndex !== null} onClose={handleClose}>
        <Box sx={modalStyle}>
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          {openIndex !== null && (
            <>
              <div className="relative w-full h-[80vh] rounded-lg overflow-hidden bg-white">
                <Image
                  src={achievements[openIndex].imageUrl}
                  alt={achievements[openIndex].title}
                  fill
                  className="object-contain object-center"
                  sizes="90vw"
                />
              </div>

              {achievements[openIndex].title && (
                <Typography
                  variant="h6"
                  sx={{ mt: 2, color: 'black', textAlign: 'center' }}
                >
                  {achievements[openIndex].title}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default ExpertAchievementsTab
