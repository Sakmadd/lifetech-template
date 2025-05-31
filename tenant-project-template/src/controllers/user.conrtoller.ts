import { Request, Response } from 'express';
import { Exception } from '../middlewares/response.middleware';
import { UserService } from '../services/user.service';
import { UserSyncSchema } from '../validations/user.validation';
export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  SyncUser = async (req: Request, res: Response) => {
    const validate = UserSyncSchema.safeParse(req.body);

    if (!validate.success) {
      return res.error(new Exception('BAD_REQUEST', 400, validate.error));
    }

    try {
      const user = await this.userService.SyncUser(validate.data);
      return res.success(user, 'User synced successfully', 200);
    } catch (error) {
      res.error(error as Exception);
    }
  };
}
