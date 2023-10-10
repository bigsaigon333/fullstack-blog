import {
  UseMutationOptions,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { fetchMyProfile, logout } from "../../remotes/myProfile.js";

export default function useMyProfile() {
  return useSuspenseQuery({
    queryKey: ["my-profile"],
    queryFn: () => fetchMyProfile(),
  });
}

export function useLogout(options?: UseMutationOptions) {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logout(),
    ...options,
  });
}
