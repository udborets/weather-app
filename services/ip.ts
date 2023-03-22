import axios from "axios";

export async function getIp() {
  const response = await axios.get<{ ip: string }>("https://ipwho.is/");
  if (response.statusText === "OK") return response.data.ip;
  return null;
}
