declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      NTBA_FIX_319: string;
      CHAT_ID: string;
      ODESSA_LAT: string;
      ODESSA_LONG: string;
      WEATHER_API_KEY: string;
      MYSQL_USER: string;
      MYSQL_PASSWORD: string;
      STORAGE_PRIVAT: string;
      STORAGE_MONOBANK: string;
      RATE_URL_PRIVAT: string;
      RATE_URL_MONOBANK: string;
      IMAGE_URL: string;
      STICKER_URL: string;
      HEROKU_URL: string;
    }
  }
}

export {};
