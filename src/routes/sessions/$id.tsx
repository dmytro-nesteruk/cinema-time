import { Paper, Stack, Title } from "@mantine/core";
import { createFileRoute, useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useMemo } from "react";

import { DateFilters, useDateFilters } from "@widgets/date-filters";

import { BookSession } from "@features/book-session";

import { useMovieStore } from "@entities/movie";
import { MovieSessionCard, mapToMovieSessionCardProps } from "@entities/movie-session";
import { useUserEventsStore } from "@entities/user-event";

import { Each } from "@shared/ui/base/each";
import { Show } from "@shared/ui/base/show";

export const Route = createFileRoute("/sessions/$id")({
	component: RouteComponent
});

function RouteComponent() {
	const { id } = useParams({ from: "/sessions/$id" });
	const { startDate, endDate } = useDateFilters();

	const movie = useMovieStore((state) => state.movies.find((movie) => movie.id === id));
	const events = useUserEventsStore((state) => state.events);

	const filteredEvents = useMemo(() => {
		if (!startDate || !endDate) return events;

		return events.filter((event) => {
			if (!startDate || !endDate || !movie) return true;

			const start = dayjs(event.startDate);
			const end = dayjs(event.startDate).add(movie.duration, "minute");

			const isAfterOrSame = start.isSame(startDate) || start.isAfter(startDate);
			const isBeforeOrSame = end.isBefore(endDate) || end.isSame(endDate);

			return isAfterOrSame && isBeforeOrSame;
		});
	}, [startDate, endDate, movie, events]);

	const sessions = useMemo(() => {
		if (!movie || !movie.sessions || movie.sessions.length === 0) {
			return [];
		}

		const filteredSessions =
			!startDate || !endDate
				? movie.sessions
				: movie.sessions.filter((session) => {
						const start = dayjs(session.startDate);
						const end = dayjs(session.startDate).add(movie.duration, "minute");

						const isAfterOrSame = start.isSame(startDate) || start.isAfter(startDate);
						const isBeforeOrSame = end.isBefore(endDate) || end.isSame(endDate);

						return isAfterOrSame && isBeforeOrSame;
					});

		if (filteredSessions.length === 0) {
			return [];
		}

		if (filteredEvents.length === 0) {
			return filteredSessions.map(({ id, startDate }) =>
				mapToMovieSessionCardProps({ id, startDate, isAvailable: true, duration: movie.duration })
			);
		}

		return filteredSessions.map(({ startDate, id }) => {
			const sessionStart = dayjs(startDate);
			const sessionEnd = dayjs(startDate).add(movie.duration, "minute");

			const intersection = filteredEvents.find((event) => {
				const eventStart = dayjs(event.startDate);
				const eventEnd = dayjs(event.endDate);

				return (
					(sessionStart >= eventStart && sessionStart < eventEnd) ||
					(sessionEnd > eventStart && sessionEnd <= eventEnd) ||
					(sessionStart <= eventStart && sessionEnd >= eventEnd)
				);
			});

			if (intersection) {
				return mapToMovieSessionCardProps({
					id,
					startDate,
					isAvailable: false,
					conflict: intersection.title,
					duration: movie.duration
				});
			}

			return mapToMovieSessionCardProps({
				id,
				startDate,
				isAvailable: true,
				duration: movie.duration
			});
		});
	}, [movie, startDate, endDate, filteredEvents]);

	return (
		<Stack>
			<DateFilters />

			<Stack component="ul" gap="md" p="sm" maw="475px" w="100%" mx="auto">
				<Show
					when={sessions.length > 0}
					fallback={
						<Paper mx="auto">
							<Title>Nothing found...</Title>
						</Paper>
					}
				>
					<Each items={sessions}>
						{(session) => (
							<MovieSessionCard
								{...session}
								key={session.id}
								actions={() => (
									<Show when={session.isAvailable}>
										<BookSession
											id={session.id}
											startDate={session.startDate}
											title="Book a ticket"
										/>
									</Show>
								)}
							/>
						)}
					</Each>
				</Show>
			</Stack>
		</Stack>
	);
}
