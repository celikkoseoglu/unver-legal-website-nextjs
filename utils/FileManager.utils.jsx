import storage from "local-storage-fallback";

export const getInitialTheme = () => {
  const savedTheme = storage.getItem("theme");
  return savedTheme === "true";
};
