import dayjs from "dayjs";
import { create } from "zustand";

import { Movie, MovieSession } from "@shared/models/movie";

type MovieStore = {
	movies: Movie[];
};

const createSessions = (
	sessionsCount: number,
	duration: number,
	minStartHour = 9,
	maxStartHour = 23
): MovieSession[] => {
	const minutesAvailable = (maxStartHour - minStartHour) * 60;
	const maxSessionsPerDay = Math.floor(minutesAvailable / duration);

	if (maxSessionsPerDay <= 0) {
		return [];
	}

	const sessions = [];
	const startDay = dayjs().startOf("day");

	for (let i = 0; i < sessionsCount; i++) {
		const dayOffset = Math.floor(i / maxSessionsPerDay);
		const slotInDay = i % maxSessionsPerDay;

		const sessionStart = startDay
			.add(dayOffset, "day")
			.add(minStartHour, "hour")
			.add(slotInDay * duration, "minute");

		sessions.push({
			id: crypto.randomUUID(),
			startDate: sessionStart.toISOString()
		});
	}

	return sessions;
};

export const useMovieStore = create<MovieStore>()(() => ({
	movies: [
		{
			id: "the-shawshank-redemption",
			title: "The Shawshank Redemption",
			description:
				"A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.",
			poster:
				"https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_FMjpg_UY480_.jpg",
			duration: 144,
			sessions: createSessions(300, 144)
		},
		{
			id: "the-dark-knight",
			title: "The Dark Knight",
			description:
				"When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.",
			poster:
				"https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY473_.jpg",
			duration: 152,
			sessions: createSessions(300, 152)
		},
		{
			id: "schindlers-list",
			title: "Schindler's List",
			description:
				"In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
			poster:
				"https://m.media-amazon.com/images/M/MV5BYmJlMjNkZWQtODgyMi00MjExLWI2MDMtZjk2MTU5YjI1YTljXkEyXkFqcGc@._V1_FMjpg_UY506_.jpg",
			duration: 195,
			sessions: createSessions(300, 195)
		},
		{
			id: "pulp-fiction",
			title: "Pulp Fiction",
			description:
				"The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
			poster:
				"https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_FMjpg_UY465_.jpg",
			duration: 154,
			sessions: createSessions(300, 154)
		},
		{
			id: "forrest-gump",
			title: "Forrest Gump",
			description:
				"The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.",
			poster:
				"https://m.media-amazon.com/images/M/MV5BZGY1NDllYjgtMzg1NS00YWMwLTkxYzgtM2I1MjU0MmMyNzA2XkEyXkFqcGc@._V1_FMjpg_UY474_.jpg",
			duration: 142,
			sessions: createSessions(300, 142)
		}
	]
}));
