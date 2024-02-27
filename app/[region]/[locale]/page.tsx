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

  return (
    <div>
      <div> Choisissez votre langue</div>
      <Link href={`/${region}/fr/`}>FR</Link>
      <Link href={`/${region}/en/`}>EN</Link>
      <Link href={`/${region}/${locale}/${region}`}>Suivant</Link>
    </div>
  );
}
