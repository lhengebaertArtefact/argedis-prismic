import { createClient } from "@/prismicio";

export default async function Region({
  params,
}: {
  params: { region: string; locale: string };
}) {
  const client = createClient();
  const { region, locale } = params;
  const myRegion = await client.getByUID("region", region);

  // Vérifier si le document est publié ou non
  const isPublished = !myRegion.tags.includes("unpublished");

  // Afficher la page uniquement en mode développement ou si le document est publié
  if (
    process.env.NODE_ENV !== "production" ||
    (process.env.NODE_ENV === "production" && isPublished)
  ) {
    return (
      <div>
        <div>{myRegion.data.region_name}</div>
        <div>{myRegion.data.meta_description}</div>
        <img src={myRegion.data.region_photo?.url || ""} />
      </div>
    );
  } else {
    // En mode de production et le document n'est pas publié, renvoyer une erreur 404
    return (
      <div>
        <h1>Page not found</h1>
        <p>404</p>
      </div>
    );
  }
}
