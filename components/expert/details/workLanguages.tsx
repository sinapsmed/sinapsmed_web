type Props = { workLanguages: string };
import "flag-icons/css/flag-icons.min.css";
import { useTranslations } from "next-intl";


export default function WorkLanguages({ workLanguages }: Props) {
  const langs = workLanguages.split(";").map(l => l.trim().toLowerCase()).filter(Boolean);
  const t = useTranslations("expert");
  return (
    <div className="my-4">
    <h4 className="text-lg font-semibold mb-2">{t("detail.workLanguages")}</h4>
    <ul className="flex flex-wrap gap-2">
      {langs.map((lang, i) => {

        if (!lang) return null;
        return (
          <li key={i} className="flex items-center gap-1 px-2 py-1 border rounded bg-gray-100 text-sm">
            <span className={`fi fi-${lang} w-5 h-3 rounded-sm`} />
            <span className="text-sm font-medium">{t(`detail.workLang.${lang}`)}</span>
          </li>
        );
      })}
    </ul>
    </div>
  );
}
