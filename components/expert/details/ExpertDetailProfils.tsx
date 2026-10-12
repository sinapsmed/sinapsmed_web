'use client';

import React from "react";
import Bg from "@/public/background.svg";
import Image from "next/image";
import ButtonLink from "@/components/commons/ButtonLink";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import WorkLanguages from "./workLanguages";

interface Props {
  photoUrl?: string | null;
  fullName: string;
  biography?: string | null;
  id: string | null;
  specality: string;
  locationCity: string;
  workLanguages: string;
}

const ExpertDetailProfils = ({
  photoUrl,
  fullName,
  biography,
  id,
  specality,
  locationCity,
  workLanguages,
}: Props) => {
  const t = useTranslations("expert");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale(); 
  const appointmentUrl = React.useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === locale) {
      segments.shift();
    }
    if (segments.length > 0) {
      if (segments[segments.length - 1] === "details") {
        segments[segments.length - 1] = "appointment";
      } else if (segments[segments.length - 1] !== "appointment") {
        segments.push("appointment");
      }
    }
    const appointmentPathWithoutLocale = "/" + segments.join("/");
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set("id", id);
    else params.delete("id");
    const query = params.toString();
    return query
      ? `${appointmentPathWithoutLocale}?${query}`
      : appointmentPathWithoutLocale;
  }, [pathname, searchParams, id, locale]);

  const bio = biography?.trim() || null;

  return (
    <div className="rounded-lg overflow-hidden shadow-md w-full">
      <div
        className="md:h-[200px] h-[100px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Bg.src})` }}
      />
      <div className="relative px-6 pt-[60px] pb-6 bg-white/90 backdrop-blur-sm">
        <div className="absolute top-[-60px] w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-white shadow sm:left-6 left-[calc(50%-60px)]">
          <Image src={photoUrl ?? ""} alt={fullName || "photo"} width={200} height={200} className="w-full h-full" />
        </div>

        <div className="pl-[10px]">
          <div className="my-4 flex justify-between items-center sm:flex-row flex-col gap-2 sm:text-left text-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {specality} {fullName}
              </h2>
              {locationCity && (
                <p className="text-base text-slate-500 mt-1">{locationCity}</p>
              )}
            </div>
            <ButtonLink className="w-fit text-center" href={appointmentUrl}>
              {t("appointment.get")}
            </ButtonLink>
          </div>

          <p className="mt-2 text-base text-slate-700 w-full break-words hyphens-auto whitespace-pre-line sm:text-left text-center">
            {bio ?? t("detail.emptyBiography")}
          </p>
          {workLanguages &&  <WorkLanguages workLanguages={workLanguages} />}
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailProfils;
