import { MakeOrderSuccess } from "@/actions/checkout";
import PaymentSection from "@/containers/checkout/PaymentSection";
import { SearchParams } from "@/types/query";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface MetadataProps {
  searchParams: SearchParams
}


const toStr = (v: string | string[] | undefined): string | undefined =>
  Array.isArray(v) ? v[0] : v;

export async function generateMetadata({ searchParams }: MetadataProps): Promise<Metadata> {
  const status = toStr(searchParams.STATUS) ?? "unknown";


  try {
    const t = await getTranslations(`payment.${status}`);
    return { title: t("title") };
  } catch {
    const t = await getTranslations("payment");
    return { title: t("fallbackTitle") }; // mesajlarınızda belə bir açar olsun
  }
}

interface Props {
  searchParams: SearchParams
}

export default async function PaymentPage({ searchParams }: Props) {
  const id = toStr(searchParams.ID);
  const status = toStr(searchParams.STATUS);
  await MakeOrderSuccess(id as string, status as string);

  return (
    <main>
      <PaymentSection ID={id} status={status} />
    </main>
  );
}
