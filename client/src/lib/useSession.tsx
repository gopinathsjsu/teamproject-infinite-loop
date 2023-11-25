import { useEffect } from "react";
import { apiGetAuthUser } from "./auth-api";
import useStore from "../store";

export default function useSession() {
  const store:any = useStore();

  async function fetchUser() {
    try {
      const user = await apiGetAuthUser();
      store.setAuthUser(user);
    } catch (error: any) {
      store.reset();
    }
  }

  useEffect(() => {
    if (!store.authUser) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store.authUser;
}
