declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: "development" | "production" | "test";
      INTERNAL_API_SERVER_ORIGIN: string;
      PUBLIC_SSR_SERVER_ORIGIN: string;
    }
  }
}

export {};
