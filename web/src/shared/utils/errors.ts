import { AxiosError } from 'axios';

export function isTokenExpiredError(error: unknown): boolean {
  if (error instanceof AxiosError &&
    error.response?.status === 401 &&
    error.response?.data?.message === 'Token inválido') {
    return true;
  }

  return false;
}

export function getServerErrorMessage(error: unknown): string | null {
  let message: string | null = null;
  if (error instanceof AxiosError) {
    message = error.response?.data?.message ?? null;
  }

  return message;
}
