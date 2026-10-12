'use client'

import React, { useState } from 'react'
import { Tabs, Tab, Box } from '@mui/material'
import ExpertGalleryTab from './Tabs/ExpertGalleryTab'
import ExpertEducationTab from './Tabs/ExpertEducationTab'
import ExpertAchievementsTab from './Tabs/ExpertAchievementsTab'
import { GalleryItem, Education, Achievements } from '@/types/expert'
import { useTranslations } from 'next-intl'

const TabsComponent = ({
  galleries,
  educations,
  achievements
}: {
  galleries: GalleryItem[]
  educations: Education[]
  achievements: Achievements[]
}) => {
  const [value, setValue] = useState(0)
  const t = useTranslations('expert')

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }


  const certificationItems = achievements.filter(a => a.achievementType === 1)
  const eventItems         = achievements.filter(a => a.achievementType === 2)
  const articleItems       = achievements.filter(a => a.achievementType === 3)

  return (
    <Box className="w-full mt-4 bg-[#f9f9f9] rounded-lg shadow-md">
      <Box sx={{ overflowX: 'auto' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="Expert Tabs"
          sx={{
            minHeight: '48px',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '14px',
              color: '#555',
              minWidth: 140,             
              whiteSpace: 'nowrap',
              padding: '8px 16px',
            },
            '& .Mui-selected': {
              color: '#000',
              backgroundColor: '#fff',
              borderRadius: '8px 8px 0 0',
            },
            '& .MuiTabs-indicator': { display: 'none' },
            backgroundColor: '#eee',
            borderRadius: '12px 12px 0 0',
            padding: '4px',
          }}
        >
          <Tab label={t('detail.education')} />
          <Tab label={t('detail.certificationsDiplomas')} />
          <Tab label={t('detail.seminarsCongresses')} />
          <Tab label={t('detail.scientificArticles')} />
          <Tab label={t('detail.gallery')} />
        </Tabs>
      </Box>


      <Box sx={{ padding: 2 }}>
        {value === 0 && <ExpertEducationTab educations={educations} />}
        {value === 1 && <ExpertAchievementsTab achievements={certificationItems} />}
        {value === 2 && <ExpertAchievementsTab achievements={eventItems} />}
        {value === 3 && <ExpertAchievementsTab achievements={articleItems} />}
        {value === 4 && <ExpertGalleryTab galleries={galleries} />}
      </Box>
    </Box>
  )
}

export default TabsComponent
