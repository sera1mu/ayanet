/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The configuration path
     */
    readonly CONFIG_PATH: string;
  }
}
