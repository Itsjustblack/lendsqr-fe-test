import { create } from "zustand";

interface MobileMenuActions {
	openMenu: () => void;
	closeMenu: () => void;
	toggleMenu: () => void;
}

interface MobileMenuState {
	isOpen: boolean;
	actions: MobileMenuActions;
}

const useMobileMenuStore = create<MobileMenuState>((set) => ({
	isOpen: false,
	actions: {
		openMenu: () => set({ isOpen: true }),
		closeMenu: () => set({ isOpen: false }),
		toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
	},
}));

export const useIsMenuOpen = () => useMobileMenuStore((state) => state.isOpen);

export const useMobileMenuActions = () =>
	useMobileMenuStore((state) => state.actions);
