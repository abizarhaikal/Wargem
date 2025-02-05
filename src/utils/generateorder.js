import { randomBytes } from 'crypto';

export const generateOrderId = () => {
  return `ORDER-${randomBytes(5).toString('hex').toUpperCase()}`;
};