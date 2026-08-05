import { apiClient } from './client';

export type AuthUser = {
  id: string;
  email: string;
};

type AuthResponse = {
  data: {
    user: AuthUser;
    accessToken: string;
  };
};

type RefreshResponse = {
  data: {
    accessToken: string;
  };
};

type MeResponse = {
  data: {
    user: AuthUser;
  };
};

export async function register(
  email: string,
  password: string
): Promise<AuthResponse['data']> {
  const res = await apiClient<AuthResponse>('/auth/register', {
    method: 'POST',
    body: { email, password },
  });
  return res.data;
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse['data']> {
  const res = await apiClient<AuthResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  return res.data;
}

export async function refresh(): Promise<string> {
  const res = await apiClient<RefreshResponse>('/auth/refresh', {
    method: 'POST',
  });
  return res.data.accessToken;
}

export async function logout(): Promise<void> {
  await apiClient('/auth/logout', {
    method: 'POST',
  });
}

export async function me(token: string): Promise<AuthUser> {
  const res = await apiClient<MeResponse>('/auth/me', { token });
  return res.data.user;
}

export async function deleteAccount(token: string): Promise<void> {
  await apiClient('/auth/account', {
    method: 'DELETE',
    token,
  });
}