import { config } from "dotenv";

config();

const throwIfNot = function<T, K extends keyof T>(obj: Partial<T>, prop: K, msg?: string) {
  if (obj[prop] === undefined || obj[prop] === null) {
    throw new Error(msg || `Environement is missing ${prop}`);
  } else {
    return obj[prop] as T[K];
  }
}

throwIfNot(process.env, 'PEXELS_API_KEY');

export interface IProcessEnv {
  PEXELS_API_KEY: string
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IProcessEnv {}
  }
}
