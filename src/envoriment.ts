function getEnv() {
  const env = import.meta.env;
  return {
    BASE_URL: env.VITE_BASE_URL,
  };
}

export const envoriment = getEnv();
