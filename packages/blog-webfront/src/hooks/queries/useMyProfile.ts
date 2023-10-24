import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchMyProfile } from "../../remotes/myProfile.js";

import { globalQueryClient } from "../../utils/reactQuery.js";

export default function useMyProfile() {
  const { data } = useSuspenseQuery({
    queryKey: ["my-profile"],
    queryFn: () => fetchMyProfile(),
  });

  return data;
}

useMyProfile.refetch = async () => {
  return globalQueryClient.refetchQueries({ queryKey: ["my-profile"] });
};
