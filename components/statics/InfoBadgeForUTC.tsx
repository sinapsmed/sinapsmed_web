
import useLocalStorage from "@/hooks/useLocalStorage";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

export default   function InfoBadgeForUTC() {
    const [showUTCInfoTimeAlert, setShowUTCInfoTimeAlert] = useLocalStorage('showUTCInfoTimeAlert', true)
  
    const t =  useTranslations('infoUTC')

  return (
    <>

    <div className="bg-blue-100 border-t border-b  flex gap-2  items-start md:items-center border-blue-500  px-4 py-3 rounded-md" role="alert">
    <FontAwesomeIcon icon={faCircleInfo} className="text-blue-600"  />


  <p title={t('title')} className="font-semibold  text-[12px] md:text-sm text-blue-700">{t('title')}</p>
</div>

    
     
    </>
  );
}