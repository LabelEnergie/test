import { HttpStatusCode } from "axios";

export function getError(err: any): {
  message: string;
  statusCode: HttpStatusCode;
} {
  const error = err?.response?.data;
  if (error) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    };
  }
  return {
    message: "Erreur inconnue",
    statusCode: 500,
  };
}
