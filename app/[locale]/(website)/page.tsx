import { GetAllBanner } from "@/actions/banner";
import { GetAllBoostedExpert } from "@/actions/expert";
import { GetAllFAQ } from "@/actions/faq";
import { GetAllPartner } from "@/actions/partner";
import AboutSection from "@/containers/about/AboutSection";
import ExpertSliderSection from "@/containers/home/ExpertSliderSection";
import FAQSection from "@/containers/home/FAQSection";
import GuideSection from "@/containers/home/GuideSection";
import HeroSection from "@/containers/home/HeroSection";
import PartnerSection from "@/containers/home/PartnerSection";
import { Banner } from "@/types/banner";

export default async function HomePage() {
  const [
    getAllBanner,
    getAllFAQ,
    getAllPartner,
    getAllBoostedExpert
  ] = await Promise.all([
    GetAllBanner(),
    GetAllFAQ(),
    GetAllPartner(),
    GetAllBoostedExpert()
  ])

  return (
    <main>
      {
        getAllBanner.data && <HeroSection data={getAllBanner.data} />
      }
      {
        getAllBoostedExpert.data && <ExpertSliderSection data={getAllBoostedExpert.data.data} />
      }
      <AboutSection />
      <GuideSection />
      {
        getAllFAQ.data && <FAQSection data={getAllFAQ.data} />
      }
      {
        getAllPartner.data && <PartnerSection data={getAllPartner.data} />
      }
    </main>
  );
}
