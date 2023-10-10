import { ReactNode } from "react";
import useMyProfile from "../hooks/queries/useMyProfile.js";

type AuthorizedProps = {
  expectedRole: "admin" | "guest" | null;
  children?: ReactNode;
};

export default function Authorized({
  expectedRole,
  children,
}: AuthorizedProps) {
  const { data: myProfile } = useMyProfile();
  const currentRole = myProfile?.role ?? null;

  return currentRole === expectedRole ? children : null;
}
