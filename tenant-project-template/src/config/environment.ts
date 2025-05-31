import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV!,
  HTTP_PORT: Number(process.env.HTTP_PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_ISSUER: process.env.JWT_ISSUER!,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE!,
  JWT_PUBLIC_KEY_URL: process.env.JWT_PUBLIC_KEY_URL!,
} as const;

export const isProduction = ENV.NODE_ENV === 'production';
export const isDevelopment = ENV.NODE_ENV === 'development';
