import { apiClient } from './client';

export type PresetParameters = {
  sampleRate: 44100 | 48000 | 96000;
  duration: number;
  amplitude: number;
  channels: 'mono' | 'stereo';
  balance: number;
  fadeIn: number;
  fadeOut: number;
};

export type Preset = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  tags: string[];
  impulseType: 'pure' | 'noise';
  parameters: PresetParameters;
  usageCount: number;
  lastUsedAt?: string;
  createdAt: string;
  updatedAt: string;
};

type PresetResponse = { data: Preset };
type PresetsResponse = { data: Preset[]; meta?: { total: number } };

export async function getPresets(
  token: string,
  params?: { search?: string; tag?: string }
): Promise<Preset[]> {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.tag) query.set('tag', params.tag);

  const qs = query.toString();
  const path = qs ? `/presets?${qs}` : '/presets';

  const res = await apiClient<PresetsResponse>(path, { token });
  return res.data;
}

export async function createPreset(
  token: string,
  input: {
    name: string;
    description?: string;
    tags?: string[];
    impulseType: 'pure' | 'noise';
    parameters: PresetParameters;
  }
): Promise<Preset> {
  const res = await apiClient<PresetResponse>('/presets', {
    method: 'POST',
    body: input,
    token,
  });
  return res.data;
}

export async function updatePreset(
  token: string,
  id: string,
  input: { name?: string; description?: string; tags?: string[] }
): Promise<Preset> {
  const res = await apiClient<PresetResponse>(`/presets/${id}`, {
    method: 'PATCH',
    body: input,
    token,
  });
  return res.data;
}

export async function deletePreset(token: string, id: string): Promise<void> {
  await apiClient(`/presets/${id}`, {
    method: 'DELETE',
    token,
  });
}

export async function markPresetAsUsed(
  token: string,
  id: string
): Promise<Preset> {
  const res = await apiClient<PresetResponse>(`/presets/${id}/use`, {
    method: 'POST',
    token,
  });
  return res.data;
}

export async function exportPresets(token: string): Promise<Preset[]> {
  const res = await apiClient<PresetsResponse>('/presets/export', { token });
  return res.data;
}