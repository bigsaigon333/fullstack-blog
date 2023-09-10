import { useAtom } from "jotai";
import { useCallback, useLayoutEffect, useSyncExternalStore } from "react";
import { P, match } from "ts-pattern";

import { atomWithStorage } from "jotai/utils";
import { safeJsonParse } from "../utils/json.js";

export type Theme = "light" | "dark";

const themeKeyname = "@@theme";
const initialTheme = safeJsonParse<Theme>(themeKeyname);
const themeAtom = atomWithStorage<Theme | null>(themeKeyname, initialTheme);

const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const getSnapshot = () => darkModeQuery.matches;
const subscribe = (onStoreChange: () => void) => (
  darkModeQuery.addEventListener("change", onStoreChange),
  () => darkModeQuery.removeEventListener("change", onStoreChange)
);
const useIsSystemDarkMode = (): boolean =>
  useSyncExternalStore(subscribe, getSnapshot);

/**
 * localStorage에 저장된 값이 있으면 그 값을 사용하고 없으면 시스템 설정을 따라갑니다.
 */
const useColorMode = () => {
  const isSystemDarkMode = useIsSystemDarkMode();
  const [theme, setTheme] = useAtom(themeAtom);

  const colorMode = match([theme, isSystemDarkMode])
    .with([P.union("dark", "light"), P.any], ([_theme]) => _theme)
    .with([null, P.boolean], ([, _isSystemDarkMode]) =>
      _isSystemDarkMode ? "dark" : "light"
    )
    .exhaustive();

  const toggleColorMode = useCallback(
    (force: boolean = true) => {
      if (force) {
        setTheme(colorMode === "dark" ? "light" : "dark");
      }
    },
    [colorMode]
  );

  const respectSystemPreference = useCallback(() => setTheme(null), []);

  useLayoutEffect(() => {
    if (colorMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [colorMode]);

  return [
    colorMode,
    setTheme,
    toggleColorMode,
    respectSystemPreference,
  ] as const;
};

export default useColorMode;
