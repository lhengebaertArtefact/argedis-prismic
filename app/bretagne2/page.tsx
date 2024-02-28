import { createClient } from "@/prismicio";

export default async function Bretagne2() {
  const client = createClient();

  const bretagne2 = await client.getByUID("region", "bretagne2", {
    lang: "fr-fr",
  });

  return (
    <div>
      {bretagne2.data.region_name}
      <div>{bretagne2.data.region_photo.url}</div>
      <div>{bretagne2.data.region_photo.url}</div>
    </div>
  );
}
