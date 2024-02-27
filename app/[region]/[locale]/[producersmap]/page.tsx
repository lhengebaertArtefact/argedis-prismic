import Link from "next/link";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";

export async function generateStaticParams() {
  const client = createClient();
  const regions: any = await client.getAllByType("region");

  const gg: any[] = [];
  regions.forEach((e: any) => {
    gg.push(
      {
        region: e.uid,
        locale: "fr",
        producersmap: e.uid,
      },
      {
        region: e.uid,
        locale: "en",
        producersmap: e.uid,
      }
    );
  });
  return gg;
}

export default async function Producersmap({
  params,
}: {
  params: { region: any; locale: string; producersmap: string };
}) {
  const { locale } = params;
  const { region } = params;

  const myLocale = locale === "fr" ? "fr-fr" : "en-us";

  const client = createClient();
  const myRegion = await client.getByUID("region", region, { lang: myLocale });

  const myProd: any = myRegion.data.producers;

  // Fonction pour générer une position aléatoire dans une plage spécifique
  const getPosition = (min: any, max: any) => {
    return Math.floor(Math.random() * (max - min + 1) + min) + "px";
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <PrismicNextImage field={myRegion.data.region_photo} />
      {myProd.map((element: any) => (
        <Link
          key={element.producer.id}
          href={`/${region}/${locale}/${region}/${element.producer.uid}`}
          style={{
            position: "absolute",
            top: getPosition(0, 500), // positions verticales
            left: getPosition(0, 700), // positions horizontales
            backgroundColor: "red",
            padding: "20px",
            borderRadius: "50%",
            opacity: 0.5,
          }}
        >
          {element.producer.uid}
        </Link>
      ))}
    </div>
  );
}
