import { createClient } from "@/prismicio";

export default async function Region({
  params,
}: {
  params: { region: string; locale: string };
}) {
  const client = createClient();
  const { region, locale } = params;
  const myRegion = await client.getByUID("region", region);

  // Vérifier si aucun document n'est renvoyé

  if (!myRegion) {
    return (
      <div>
        <h1>Page not found</h1>
        <p>404</p>
      </div>
    );
  }

  // Afficher la page uniquement en mode développement ou si le document est publié

  return (
    <div>
      <div>{myRegion.data.region_name}</div>
      <div>{myRegion.data.meta_description}</div>
      <img src={myRegion.data.region_photo?.url || ""} />
    </div>
  );
}
