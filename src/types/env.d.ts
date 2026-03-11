declare namespace NodeJS {
  interface ProcessEnv {
    API_URL: string;
    SECRET_KEY: string;
    VAR_NUMBER: string;
    VAR_BOOL: string;
  }
}

declare module "*.svg" {
  import type { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
