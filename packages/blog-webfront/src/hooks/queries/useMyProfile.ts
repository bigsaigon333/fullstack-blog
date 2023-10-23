import { fetchMyProfile } from "../../remotes/myProfile.js";

import { proxy, useSnapshot } from "valtio";

const myProfilePromise = proxy({ profile: fetchMyProfile() });

export default function useMyProfile() {
  const { profile: myProfile } = useSnapshot(myProfilePromise);

  return myProfile;
}

useMyProfile.refetch = async () => {
  return (myProfilePromise.profile = fetchMyProfile());
};
