export interface IBackendErrorResponse {
  errors: {
    [key: string]: string[];
  };
}
