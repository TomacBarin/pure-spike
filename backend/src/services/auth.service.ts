import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { AppError } from '../utils/errors.js';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/tokens.js';
import type { RegisterInput, LoginInput } from '../types/auth.schemas.js';
import { PresetService } from './preset.service.js';

const SALT_ROUNDS = 12;

export class AuthService {
  static async register(input: RegisterInput) {
    const existing = await User.findOne({ email: input.email });
    if (existing) {
      throw new AppError(409, 'EMAIL_ALREADY_EXISTS', 'Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

    const user = await User.create({
      email: input.email,
      password: hashedPassword,
    });

    const accessToken = signAccessToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const refreshToken = signRefreshToken({
      userId: user._id.toString(),
    });

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }

  static async login(input: LoginInput) {
    const user = await User.findOne({ email: input.email }).select('+password');

    if (!user || !user.password) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) {
      throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    const accessToken = signAccessToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const refreshToken = signRefreshToken({
      userId: user._id.toString(),
    });

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }

  static async refresh(refreshToken: string) {
    let payload: { userId: string };

    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new AppError(401, 'INVALID_REFRESH_TOKEN', 'Invalid or expired refresh token');
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      throw new AppError(401, 'INVALID_REFRESH_TOKEN', 'User no longer exists');
    }

    const accessToken = signAccessToken({
      userId: user._id.toString(),
      email: user.email,
    });

    return { accessToken };
  }

  static async deleteAccount(userId: string) {
    // Ta bort alla presets först
    await PresetService.deleteAllByUser(userId);

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new AppError(404, 'USER_NOT_FOUND', 'User not found');
    }
  }
}