import { useUserEventsStore } from "@entities/user-event";

export const useDeleteUserEvent = () => {
	const store = useUserEventsStore();

	return store.delete;
};
