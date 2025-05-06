import { Grid } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

import { useDateFilters } from "@widgets/date-filters";

import { MovieCard, useMovieStore } from "@entities/movie";

import { Each } from "@shared/ui/base/each";
import { LinkButton } from "@shared/ui/base/link-button";

export const Route = createFileRoute("/sessions/")({
	component: RouteComponent
});

function RouteComponent() {
	const { startDate, endDate } = useDateFilters();
	const movies = useMovieStore((state) => state.movies);

	return (
		<Grid p="sm">
			<Each items={movies}>
				{(movie) => (
					<Grid.Col span={{ xs: 12, sm: 4, md: 4 }} key={movie.id}>
						<MovieCard
							title={movie.title}
							description={movie.description}
							poster={movie.poster}
							duration={movie.duration}
							actions={() => (
								<LinkButton
									to="/sessions/$id"
									params={{ id: movie.id }}
									search={{ start: startDate, end: endDate }}
								>
									View
								</LinkButton>
							)}
						/>
					</Grid.Col>
				)}
			</Each>
		</Grid>
	);
}
