import { cookies } from "next/headers";

export function getServerSideCookie() {
  const cookieStore = cookies();
  return cookieStore.get('session');
}