import { HmacSHA256 } from 'crypto-js';
import { environment } from '../../environments/environment.development';

export const Encrypt = (data: string): string => {
  return HmacSHA256(data, environment.SECRET_KEY).toString();
}

export const Compare = (data: string, encryptedData: string): boolean => {
    return HmacSHA256(data, environment.SECRET_KEY).toString() === encryptedData;
}
