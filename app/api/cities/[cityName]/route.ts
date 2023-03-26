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
  const client = await MongoClient.connect(
    "mongodb+srv://udborets:OneOfMyFavs3@udborets.rixeocn.mongodb.net/udborets?retryWrites=true&w=majority",
    options
  );
  const coll = client.db("udborets").collection("cities");
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  await client.close();
  return new Response(JSON.stringify(result));
}
