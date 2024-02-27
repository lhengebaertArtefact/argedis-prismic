import { createClient } from "@/prismicio";
import Link from "next/link";

export async function generateStaticParams() {
  const staticParams: any[] = [];
  const client = createClient();
  const regions = await client.getAllByType("region");

  for (const region of regions) {
    const { id } = region;

    staticParams.push(
      { region: id, locale: "fr" },
      { region: id, locale: "en" }
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

  return (
    <div>
      <div> {languePage[0].data.select_text}</div>
      <Link href={`/${region}/fr/`}>FR</Link>
      <Link href={`/${region}/en/`}>EN</Link>
      <Link href={`/${region}/${locale}/${region}`}>
        {languePage[0].data.button_text}
      </Link>
    </div>
  );
}
