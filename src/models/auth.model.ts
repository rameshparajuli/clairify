import * as Google from "expo-auth-session/providers/google";
import { User } from "./user.model";

export const userRequest: Partial<Google.GoogleAuthRequestConfig> | undefined =
  {
    androidClientId:
      "108956936509-r87c3hqm8n0fd060t32g95eq24t37p66.apps.googleusercontent.com",
    iosClientId:
      "108956936509-do44tqq2ntcbqec00eemgdj6g5jhovgl.apps.googleusercontent.com",
    webClientId:
      "108956936509-1ggpo7345qum00fu2o1k96o80lmi2a80.apps.googleusercontent.com",
  };

export interface AuthReq {
  token: string;
}

export interface Auth {
  data: User;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: Request;
}

export interface Headers {
  "cache-control": string;
  "content-encoding": string;
  "content-length": string;
  "content-type": string;
  date: string;
  expires: string;
  pragma: string;
  server: string;
  vary: string;
}

export interface Config {
  transitional: Transitional;
  adapter: string[];
  transformRequest: any[];
  transformResponse: any[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Env;
  headers: Headers2;
  baseURL: string;
  method: string;
  url: string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Env {}

export interface Headers2 {
  Accept: string;
  "Content-Type": string;
  Authorization: string;
}

export interface Request {}
