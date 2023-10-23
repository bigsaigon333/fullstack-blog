import { ReactNode, Suspense, use } from "react";
import { MyProfile, fetchMyProfile } from "../remotes/myProfile.js";
import useMyProfile from "../hooks/queries/useMyProfile.js";

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
