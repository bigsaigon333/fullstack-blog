import { ReactNode } from "react";
import useMyProfile from "../hooks/queries/useMyProfile.js";
import { MyProfile } from "../remotes/myProfile.js";

type AuthorizedProps = {
  expectedRole: "admin" | "guest" | null;
  children?: ReactNode;
  fallback?: ReactNode;
  render?: (profile: MyProfile | null) => ReactNode;
};

export default function Authorized({
  expectedRole,
  children,
  fallback,
  render,
}: AuthorizedProps) {
  const myProfile = useMyProfile();
  const currentRole = myProfile?.role ?? null;

  return currentRole === expectedRole
    ? render?.(myProfile) ?? children
    : fallback;
}
