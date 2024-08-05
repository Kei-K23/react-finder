import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the type for the state
type UseSettingsStoreType = {
    wallpaper: string;
    setWallpaper: (wallpaper: string) => void;
}

// Correctly type the persisted state creator
export const useSettingsStore = create<UseSettingsStoreType>(
    // @ts-ignore
    persist<UseSettingsStoreType>(
        (set) => ({
            wallpaper: "/wallpaper_1.jpg",
            setWallpaper: (wallpaper: string) => set({ wallpaper })
        }),
        {
            name: 'react-finder-settings-storage',
            storage: createJSONStorage(() => localStorage),
        },
    )
);
