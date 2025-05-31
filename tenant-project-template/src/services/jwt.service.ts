import { createRemoteJWKSet, jwtVerify } from 'jose';
import { JwtPayloadSchemaType } from '../validations/jwt.validation';
import { ENV } from '../config/environment';

export class JwtService {
  private static instance: JwtService;
  private jwks: ReturnType<typeof createRemoteJWKSet>;

  private constructor() {
    const jwksUri = new URL(ENV.JWT_PUBLIC_KEY_URL);
    this.jwks = createRemoteJWKSet(jwksUri);
  }

  public static getInstance(): JwtService {
    if (!JwtService.instance) {
      JwtService.instance = new JwtService();
    }
    return JwtService.instance;
  }

  /**
   * Verify access token using remote JWKS
   * @param token - JWT token
   */
  public async verifyToken(token: string): Promise<JwtPayloadSchemaType> {
    const { payload } = await jwtVerify(token, this.jwks, {
      issuer: ENV.JWT_ISSUER,
    });

    return payload as JwtPayloadSchemaType;
  }

  /**
   * Verify refresh token using remote JWKS
   * @param token - Refresh token
   */
  public async verifyRefreshToken(
    token: string
  ): Promise<JwtPayloadSchemaType | null> {
    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: ENV.JWT_ISSUER,
      });
      return payload as JwtPayloadSchemaType;
    } catch {
      return null;
    }
  }
}
