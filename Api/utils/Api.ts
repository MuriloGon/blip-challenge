import { StatusCodes } from 'http-status-codes';

export const ServiceResponse = (status: StatusCodes, data: any) => (
  { status, data }
);
