export type MovieSession = {
	id: string;
	startDate: string;
};

export type Movie = {
	id: string;
	title: string;
	description: string;
	poster: string;
	duration: number;
	sessions: MovieSession[];
};
