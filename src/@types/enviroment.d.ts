declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number | string;
      BD_CONNECTION_STRING: string;
      EXPIRES_IN: string | number
      JWT_SECRET: string
    }
  }
}

export {}