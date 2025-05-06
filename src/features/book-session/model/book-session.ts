import { notifications } from "@mantine/notifications";

type BookSessionParams = { id: string; startDate: string };

export const useBookSession = () => {
	const bookSession = ({ id, startDate }: BookSessionParams) => {
		notifications.show({
			color: "green",
			title: "Movie Session Booking",
			message: `You have successfully booked ${id} session on: ${startDate}`
		});
	};

	return {
		bookSession
	};
};
