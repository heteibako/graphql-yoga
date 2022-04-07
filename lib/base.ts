export async function fetchAPI(
  query: any,
  { variables }: { variables?: any } = {}
) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //   Authorization: `Bearer ${
      //     preview
      //       ? process.env.GRAPHCMS_DEV_AUTH_TOKEN
      //       : process.env.GRAPHCMS_PROD_AUTH_TOKEN
      //   }`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();

  if (json.errors) {
    console.log(process.env.NEXT_EXAMPLE_CMS_GCMS_PROJECT_ID);
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}
