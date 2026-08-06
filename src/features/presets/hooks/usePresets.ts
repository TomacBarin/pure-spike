import { useCallback, useState } from 'react';
import { useAuth } from '../../../providers/AuthProvider';
import * as presetsApi from '../../../api/presets';
import type { Preset, PresetParameters } from '../../../api/presets';
import { ApiError } from '../../../api/client';

export function usePresets() {
  const { accessToken, isAuthenticated } = useAuth();
  const [presets, setPresets] = useState<Preset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPresets = useCallback(
    async (params?: { search?: string; tag?: string }) => {
      if (!accessToken) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await presetsApi.getPresets(accessToken, params);
        setPresets(data);
      } catch (err) {
        const message =
          err instanceof ApiError ? err.message : 'Failed to load presets';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken]
  );

  const createPreset = useCallback(
    async (input: {
      name: string;
      description?: string;
      tags?: string[];
      impulseType: 'pure' | 'noise';
      parameters: PresetParameters;
    }) => {
      if (!accessToken) throw new Error('Not authenticated');

      const preset = await presetsApi.createPreset(accessToken, input);
      setPresets((prev) => [preset, ...prev]);
      return preset;
    },
    [accessToken]
  );

  const updatePreset = useCallback(
    async (
      id: string,
      input: { name?: string; description?: string; tags?: string[] }
    ) => {
      if (!accessToken) throw new Error('Not authenticated');

      const updated = await presetsApi.updatePreset(accessToken, id, input);
      setPresets((prev) =>
        prev.map((p) => (p._id === id ? updated : p))
      );
      return updated;
    },
    [accessToken]
  );

  const deletePreset = useCallback(
    async (id: string) => {
      if (!accessToken) throw new Error('Not authenticated');

      await presetsApi.deletePreset(accessToken, id);
      setPresets((prev) => prev.filter((p) => p._id !== id));
    },
    [accessToken]
  );

  const markAsUsed = useCallback(
    async (id: string) => {
      if (!accessToken) return null;

      const updated = await presetsApi.markPresetAsUsed(accessToken, id);
      setPresets((prev) =>
        prev.map((p) => (p._id === id ? updated : p))
      );
      return updated;
    },
    [accessToken]
  );

  const exportAll = useCallback(async () => {
    if (!accessToken) return;

    const data = await presetsApi.exportPresets(accessToken);
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pure-spike-presets-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [accessToken]);

  return {
    presets,
    isLoading,
    error,
    isAuthenticated,
    fetchPresets,
    createPreset,
    updatePreset,
    deletePreset,
    markAsUsed,
    exportAll,
  };
}