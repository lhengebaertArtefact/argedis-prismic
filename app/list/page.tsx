import { createClient } from "@/prismicio";
import Link from "next/link";

export default async function Home() {
  const client = createClient();
  const region = await client.getByType("region");

  return (
    <main className="">
      {region.results.map((element: any) => {
        return (
          <Link key={element.id} href={`/${element.uid}/fr`}>
            {element.uid}
          </Link>
        );
      })}
    </main>
  );
}
