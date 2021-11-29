/* eslint-disable no-unused-vars */
/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SERVER_URL: string;
    NEXT_PUBLIC_STORAGE_BUCKET: string;
    NEXT_PUBLIC_STORAGE_END_POINT: string;
    NEXT_PUBLIC_STORAGE_ACCESS_KEY: string;
    NEXT_PUBLIC_STORAGE_SECRET_KEY: string;
  }
}
