import dayjs from "dayjs";

import { MovieSessionCardProps } from "../ui/movie-session-card";

type MapToMovieSessionCardProps = {
	id: string;
	duration: number;
	startDate: string;
	isAvailable: boolean;
	conflict?: string;
};

export const mapToMovieSessionCardProps = ({
	id,
	duration,
	startDate,
	isAvailable,
	conflict
}: MapToMovieSessionCardProps): MovieSessionCardProps => ({
	id,
	conflict,
	isAvailable: isAvailable,
	startDate: dayjs(startDate).format("DD MMM YYYY, HH:mm"),
	endDate: dayjs(startDate).add(duration, "minute").format("DD MMM YYYY, HH:mm")
});
