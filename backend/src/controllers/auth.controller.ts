import type { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { env } from '../config/env.js';
import type { RegisterInput, LoginInput } from '../types/auth.schemas.js';

const REFRESH_COOKIE_NAME = 'refreshToken';
const isProduction = env.NODE_ENV === 'production';

function setRefreshCookie(res: Response, token: string) {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/api/v1/auth',
  });
}

function clearRefreshCookie(res: Response) {
  res.clearCookie(REFRESH_COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/api/v1/auth',
  });
}

export class AuthController {
  static async register(req: Request, res: Response) {
    const input = req.body as RegisterInput;
    const result = await AuthService.register(input);

    setRefreshCookie(res, result.refreshToken);

    res.status(201).json({
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  }

  static async login(req: Request, res: Response) {
    const input = req.body as LoginInput;
    const result = await AuthService.login(input);

    setRefreshCookie(res, result.refreshToken);

    res.json({
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  }

  static async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];

    if (!refreshToken) {
      return res.status(401).json({
        error: {
          code: 'MISSING_REFRESH_TOKEN',
          message: 'Refresh token is missing',
        },
      });
    }

    const result = await AuthService.refresh(refreshToken);

    res.json({
      data: {
        accessToken: result.accessToken,
      },
    });
  }

  static async logout(_req: Request, res: Response) {
    clearRefreshCookie(res);

    res.json({
      data: {
        message: 'Logged out successfully',
      },
    });
  }

  static async me(req: Request, res: Response) {
    res.json({
      data: {
        user: {
          id: req.user!.userId,
          email: req.user!.email,
        },
      },
    });
  }

  static async deleteAccount(req: Request, res: Response) {
    const userId = req.user!.userId;
    await AuthService.deleteAccount(userId);

    // Rensa refresh-cookien
    clearRefreshCookie(res);

    res.json({
      data: {
        message: 'Account deleted successfully',
      },
    });
  }
}