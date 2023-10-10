import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchMyProfile } from "../../remotes/myProfile.js";

export default function useMyProfile() {
  return useSuspenseQuery({
    queryKey: ["my-profile"],
    queryFn: () => fetchMyProfile(),
  });
}
