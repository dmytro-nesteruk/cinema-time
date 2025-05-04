import { Movie } from "./movie";

export type CinemaSession = {
	id: string;
	movie: Movie;
	startDate: string;
	endDate: string;
};
