export const safeJsonParse = <T>(keyname: string | null): T | null => {
  try {
    if (!keyname) return null;

    const value = localStorage.getItem(keyname);

    if (!value) return null;

    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};
