import { Role } from '../../generated/prisma';

export interface JwtPayload {
  id: string;
  sub: string;
  email: string;
  name: string;
  tenant_id: string;
  role: Role;
  iss: string;
  aud: string;
  exp: number;
  iat: number;
}
