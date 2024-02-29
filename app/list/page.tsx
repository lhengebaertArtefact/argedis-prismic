import { createClient } from "@/prismicio";
import Link from "next/link";

export default async function Home() {
  const client = createClient();
  const region = await client.getByType("region");

  return (
    <main className="">
      {region.results.map((element: any) => {
        // Vérifier si le document est publié ou non
        const isPublished = !element.tags.includes("unpublished");

        // Afficher le lien vers la page uniquement en mode développement ou si le document est publié
        if (process.env.NODE_ENV !== "production" || isPublished) {
          return (
            <Link key={element.id} href={`/${element.uid}/fr`}>
              {element.uid}
            </Link>
          );
        } else {
          // Ne rien afficher pour les documents non publiés en mode production
          return null;
        }
      })}
    </main>
  );
}
