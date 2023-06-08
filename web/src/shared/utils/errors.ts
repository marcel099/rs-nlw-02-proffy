import { AxiosError } from 'axios';

export function isTokenExpiredError(error: unknown): boolean {
  if (error instanceof AxiosError &&
    error.response?.status === 401 &&
    error.response?.data?.message === 'Token inválido') {
    return true;
  }

  return false;
}
