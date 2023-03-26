import { MongoClient, ConnectOptions } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: { cityName: string } }
) {
  const agg = [
    {
      $search: {
        index: "searchCities",
        autocomplete: {
          query: params.cityName,
          path: "name",
        },
      },
    },
  ];

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions;
  if (!process.env.NEXT_PUBLIC_MONGODB_CONFIG) {
    console.error("can't get mongodb config")
    return new Response(JSON.stringify({ error: "can't get mongodb config" }));
  }
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_CONFIG,
    options
  );
  const coll = client.db("udborets").collection("cities");
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  await client.close();
  return new Response(JSON.stringify(result));
}
