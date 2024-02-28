import { createClient } from "@/prismicio";
import Link from "next/link";

export async function generateStaticParams() {
  const staticParams: any[] = [];
  const client = createClient();
  const regions = await client.getAllByType("region");

  console.log(regions);

  for (const region of regions) {
    const { uid } = region;

    staticParams.push(
      { region: uid, locale: "fr" },
      { region: uid, locale: "en" }
    );
  }
  return staticParams;
}

export default async function LangChoice({
  params,
}: {
  params: { region: any; locale: string };
}) {
  const { region } = params;
  const { locale } = params;

  const myLocale = locale === "fr" ? "fr-fr" : "en-us";

  const client = createClient();

  const languePage = await client.getAllByType("langue_page", {
    lang: myLocale,
  });
  const languePageobj = languePage.find((element: any) => {
    return element.id;
  });

  return (
    <div>
      <div> {languePageobj?.data.select_text}</div>
      <Link href={`/${region}/fr/`}>FR</Link>
      <Link href={`/${region}/en/`}>EN</Link>
      <Link href={`/${region}/${locale}/${region}`}>
        {languePageobj?.data.button_text}
      </Link>
    </div>
  );
}
