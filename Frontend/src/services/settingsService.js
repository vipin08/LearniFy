import { getItem, setItem, STORAGE_KEYS } from "../utils/storage";
import { DEFAULT_SETTINGS } from "../data/mockData";

export const settingsService = {
  get() {
    return getItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  },

  update(section, updates) {
    const settings = this.get();
    settings[section] = { ...settings[section], ...updates };
    setItem(STORAGE_KEYS.SETTINGS, settings);
    return settings;
  },

  setTheme(theme) {
    return this.update("appearance", { theme });
  },
};
