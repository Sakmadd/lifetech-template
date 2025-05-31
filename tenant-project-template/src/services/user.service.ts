import { PrismaClient } from '../../generated/prisma';
import { Exception } from '../middlewares/response.middleware';
import { UserSyncSchemaType } from '../validations/user.validation';

export class UserService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  SyncUser = async (data: UserSyncSchemaType) => {
    try {
      return this.prisma.users.upsert({
        where: {
          enterpriseUserId: data.enterpriseUserId,
        },
        update: {
          name: data.name,
          email: data.email,
        },
        create: {
          name: data.name,
          email: data.email,
          enterpriseUserId: data.enterpriseUserId,
        },
      });
    } catch (error) {
      if (error instanceof Exception) {
        throw error;
      }
      throw new Exception('INTERNAL_SERVER_ERROR', 500, error);
    }
  };
}
