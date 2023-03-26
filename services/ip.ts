import axios from "axios";

export async function getIp() {
  const response = await axios.get<{ ip: string }>("https://ipwho.is/");
  return response.data.ip;
}
