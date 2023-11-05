import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchMyProfile } from "../../remotes/myProfile.js";

import useHttpClient from "../useHttpClient.js";

export default function useMyProfile() {
  return useMyProfileQuery().data;
}

export function useMyProfileQuery() {
  const httpClient = useHttpClient();

  return useSuspenseQuery({
    queryKey: ["my-profile"],
    queryFn: () => fetchMyProfile({ httpClient }),
  });
}
