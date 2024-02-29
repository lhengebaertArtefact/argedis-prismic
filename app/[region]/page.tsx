// pages/[region]/page.tsx

import { createClient } from "@/prismicio";

export default async function Region({
  params,
}: {
  params: { region: string; locale: string };
}) {
  const ENVIRONMENT = process.env.NODE_ENV || "development";
  if (ENVIRONMENT === "production") {
    // En mode de production, ne rend pas la page mais renvoie une erreur 404
    return (
      <div>
        <h1>Page not found</h1>
        <p>404</p>
      </div>
    );
  }

  // En mode de développement, récupère les données et rend la page normalement
  const client = createClient();
  const { region, locale } = params;

  try {
    const regions = await client.getByUID("region", region);

    return (
      <div>
        <div>{regions.data.region_name}</div>
        <div>{regions.data.meta_description}</div>
        <img src={regions.data.region_photo?.url || ""} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching region:", error);
    return <div>Error fetching region data.</div>;
  }
}
