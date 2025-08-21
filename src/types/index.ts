export type GeneralFilter = {
  enabled: boolean;
};

export type ResponseData<T> = {
  data: T[];
  page: number;
  limit: number;
  totalData: number;
  totalPage: number;
};

export type SingleResponseData<T> = {
  data: T;
  success: boolean;
};

export type ErrorResponse = {
  error: string;
  message: string;
};
