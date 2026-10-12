import ExpertDetailProfils from '@/components/expert/details/ExpertDetailProfils'
import Container from '@/components/statics/dashboard/Container'
import React from 'react'
import TabsComponent from '@/components/expert/details/ExpertDetailTabs'
import ExpertBlogs from '@/components/expert/details/ExpertBlogs'
import { DetailsExpert } from '@/types/expert'
import SocialLinks from '@/components/expert/details/SocialLinks'
import { useTranslations } from 'next-intl'

const ExpertDetailSection = ({ expert }: { expert: DetailsExpert }) => {
  const t = useTranslations('expert')
  const socialMedias = expert.socialMedias || []
  return (
    <Container className="w-full px-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 lg:col-start-1 lg:row-start-1">
          <ExpertDetailProfils
            photoUrl={expert.photoUrl}
            fullName={expert.fullName}
            biography={expert.biography}
            id={expert.id || ''}
            specality={expert.specality || ''}
            locationCity={expert.locationCity || ''}
            workLanguages={expert.workLanguage || ''}
          />

          <TabsComponent
            educations={expert.educations || []}
            galleries={expert.galleries || []}
            achievements={expert.achievements || []}
          />
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:row-start-1">
          <ExpertBlogs id={expert.id || ''} />
        </div>
        {socialMedias.length > 0 && (
          <div className="col-span-12 lg:col-span-8 lg:col-start-1 lg:row-start-2 rounded-lg overflow-hidden shadow-md p-2">
            <h1 className="font-semibold text-lg p-1">
              {t('detail.socialLinks')}
            </h1>
            <SocialLinks data={socialMedias}  />
          </div>
        )}
      </div>
    </Container>
  )
}

export default ExpertDetailSection
