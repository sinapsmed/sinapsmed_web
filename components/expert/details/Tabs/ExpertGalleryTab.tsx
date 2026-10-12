'use client'

import React, { useState } from 'react'
import { Grid, Modal, Box, IconButton } from '@mui/material'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close'
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface GalleryItem {
  type: number
  url: string
}

const MediaType = {
  Image: 0,
  Video: 1,
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 1000,
  bgcolor: '#fff',
  borderRadius: 2,
  boxShadow: 24,
  outline: 'none',
  p: 2,
}

const ExpertGalleryTab = ({ galleries }: { galleries: GalleryItem[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleOpen = (index: number) => setOpenIndex(index)
  const handleClose = () => setOpenIndex(null)

  return (
    <>
      <Grid container spacing={3}>
        {galleries.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <div
              onClick={() => handleOpen(index)}
              className="group relative bg-black border aspect-square overflow-hidden rounded-lg cursor-pointer"
            >
              <FontAwesomeIcon
                icon={item.type === MediaType.Image ? faImage : faVideo}
                className="absolute text-blue-500 top-1 right-1 z-[1]"
              />
              {item.type === MediaType.Image ? (
                <Image
                  src={item.url}
                  alt=""
                  fill
                  className="object-cover group-hover:scale-125 transition-all"
                />
              ) : (
                <video
                  src={item.url}
                  className="w-full h-full object-cover group-hover:scale-125 transition-all"
                  muted
                  playsInline
                  preload="metadata"
                />
              )}
            </div>
          </Grid>
        ))}
      </Grid>

      <Modal open={openIndex !== null} onClose={handleClose}>
        <Box sx={modalStyle}>
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 8, right: 8, color: 'white', zIndex: 2 }}
          >
            <CloseIcon />
          </IconButton>

          {openIndex !== null && (
            <div className="relative w-full h-[80vh] rounded-lg overflow-hidden">
              {galleries[openIndex].type === MediaType.Image ? (
                <Image
                  src={galleries[openIndex].url}
                  alt=""
                  fill
                  className="object-contain object-center"
                />
              ) : (
                <video
                  src={galleries[openIndex].url}
                  className="w-full h-full object-contain object-center"
                  muted
                  autoPlay
                  loop
                  playsInline
                  controls
                />
              )}
            </div>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default ExpertGalleryTab
