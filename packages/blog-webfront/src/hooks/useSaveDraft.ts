import { useAtom } from "jotai";
import { useCallback } from "react";

import { atomWithStorage } from "jotai/utils";
import { safeJsonParse } from "../utils/json.js";

export type Draft = { title: string; content: string };

const draftKeyname = "@@draft";
const initialDraft = safeJsonParse<Draft>(draftKeyname);
const draftAtom = atomWithStorage<Draft | null>(draftKeyname, initialDraft);

const useSaveDraft = () => {
  const [draft, setDraft] = useAtom(draftAtom);

  const clearDraft = useCallback(() => setDraft(null), []);

  return [draft, setDraft, clearDraft] as const;
};

export default useSaveDraft;
