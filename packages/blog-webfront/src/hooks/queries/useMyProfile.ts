import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchMyProfile } from "../../remotes/myProfile.js";

import { globalQueryClient } from "../../utils/reactQuery.js";
import useHttpClient from "../useHttpClient.js";

export default function useMyProfile() {
  const httpClient = useHttpClient();

  const { data } = useSuspenseQuery({
    queryKey: ["my-profile"],
    queryFn: () => fetchMyProfile({ httpClient }),
  });

  return data;
}

useMyProfile.refetch = async () => {
  return globalQueryClient.refetchQueries({ queryKey: ["my-profile"] });
};
