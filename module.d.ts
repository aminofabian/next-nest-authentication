/* eslint-disable prettier/prettier */
declare namespace NodeJS{
  export interface ProcessEnv {
    DATABASE_URL: string;
    JwtSecretKey: string;
    jwtRefreshTokenKey: string;
  }
}