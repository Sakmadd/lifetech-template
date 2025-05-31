import { z } from 'zod';

export const UserSyncSchema = z.object({
  enterpriseUserId: z.string().min(1, 'Enterprise user ID is required'),
  email: z.string().min(1, 'Email is required'),
  name: z.string().min(1, 'Name is required'),
});

export type UserSyncSchemaType = z.infer<typeof UserSyncSchema>;
