import { useUserEventsStore } from "@entities/user-event";

export const useDeleteUserEvent = () => {
	const remove = useUserEventsStore((state) => state.delete);

	return remove;
};
