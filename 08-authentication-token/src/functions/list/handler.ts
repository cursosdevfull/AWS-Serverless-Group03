export const listHandler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify([
      { name: "Client01", id: "1" },
      { name: "Client02", id: "2" },
      { name: "Client03", id: "3" },
      { name: "Client04", id: "4" },
      { name: "Client05", id: "5" },
      { name: "Client06", id: "6" },
      { name: "Client07", id: "7" },
      { name: "Client08", id: "8" },
      { name: "Client09", id: "9" },
      { name: "Client10", id: "10" },
    ]),
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      "Access-Control-Allow-Origin": "*",
    },
  };
};
