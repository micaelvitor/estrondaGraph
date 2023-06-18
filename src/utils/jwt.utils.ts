import { sign, SignOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

/**
 * generates JWT used for local testing
 */
export function generateToken() {
  // Information to be encoded in the JWT
  const payload = {
    name: 'Micael VItor',
    userId: 1,
    accessTypes: ['login', 'register', 'graphql', 'admin']
  };

  // Read private key value
  const privateKeyPath = path.join(__dirname, './../private.key');
  const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

  // Read public key value
  const publicKeyPath = path.join(__dirname, './../public.key');
  const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

  const signInOptions: SignOptions = {
    algorithm: 'RS256',
    expiresIn: '1h'
  };

  // Generate JWT
  return sign(payload, privateKey, signInOptions);
}
