import { z } from 'zod';

export const JwtPayloadSchema = z.object({
  userEnterpriseId: z.string(),
  sub: z.string(),
  email: z.string().email(),
  name: z.string(),
  tenantEnterpriseId: z.string(),
  role: z.enum(['SUPERADMIN', 'ADMIN', 'STAFF']),
  iss: z.string(),
  aud: z.array(z.string()),
  exp: z.number(),
  iat: z.number(),
});

// Gunakan tipe ini kalau kamu mau cast ke TypeScript
export type JwtPayloadSchemaType = z.infer<typeof JwtPayloadSchema>;
