declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      HOST: string;
      DB_HOST: string;
      DB_USER: string;
      DB_DATABASE: string;
      DB_PASSWORD: string;
      SECRET_JWT: string;
    }
  }
}

export {};