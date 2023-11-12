import { useAtom } from "jotai";

import { atomWithStorage, useResetAtom } from "jotai/utils";
import { safeJsonParse } from "../utils/json.js";
import { useCallback } from "react";

export type Draft = { title: string; content: string };

const draftKeyname = "@@draft";
const initialDraft = safeJsonParse<Draft>(draftKeyname);
const draftAtom = atomWithStorage<Draft | null>(draftKeyname, initialDraft);

const useSaveDraft = () => {
  const [draft, setDraft] = useAtom(draftAtom);

  const clearDraft = useCallback(() => setDraft(null), [setDraft]);

  return [draft, setDraft, clearDraft] as const;
};

export default useSaveDraft;
