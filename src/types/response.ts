export type BaseResponse<T = object> =
  | ({
      success: true;
    } & T)
  | {
      success: false;
      error: string;
    };
