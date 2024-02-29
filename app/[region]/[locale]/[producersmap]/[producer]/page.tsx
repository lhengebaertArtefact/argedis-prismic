import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";

export async function generateStaticParams() {
  const client = createClient();
  const regions: any = await client.getAllByType("region");

  const gg: any[] = [];

  regions.forEach((region: any) => {
    region.data.producers.forEach((element: any) => {
      gg.push(
        {
          region: region.uid,
          locale: "en",
          producersmap: region.uid,
          producer: element.uid,
        },
        {
          region: region.uid,
          locale: "fr",
          producersmap: region.uid,
          producer: element.uid,
        }
      );
    });
  });
  return gg;
}

export default async function ProducersPage({
  params,
}: {
  params: {
    region: string;
    locale: string;
    producersmap: string;
    producer: string;
  };
}) {
  const { producer, locale } = params;
  const client = createClient();
  const myLocale = locale === "fr" ? "fr-fr" : "en-us";

  const myProducer = await client.getByUID("producer", producer, {
    lang: myLocale,
  });

  if (!myProducer) {
    return (
      <div>
        <h1>Page not found</h1>
        <p>404</p>
      </div>
    );
  }

  return (
    <main className="">
      <PrismicNextImage field={myProducer.data.producer_photo} />
      <div>{myProducer.data.producer_name}</div>
      <div>{myProducer.data.producer_description}</div>
    </main>
  );
}
