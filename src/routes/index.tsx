import { Group, Paper, Stack, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useMemo } from "react";

import { DateFilters } from "@widgets/date-filters";
import { useDateFilters } from "@widgets/date-filters/model/use-date-filters";

import { AddUserEvent } from "@features/add-user-event";
import { DeleteUserEvent } from "@features/delete-user-event";

import { UserEventCard, useUserEventsStore } from "@entities/user-event";

import { Each } from "@shared/ui/base/each";
import { Show } from "@shared/ui/base/show";

export const Route = createFileRoute("/")({
	component: RouteComponent
});

function RouteComponent() {
	const { events } = useUserEventsStore();
	const { startDate, endDate } = useDateFilters();

	const filtered = useMemo(
		() =>
			events.filter(
				(event) =>
					dayjs(event.startDate).isAfter(startDate) && dayjs(event.endDate).isBefore(endDate)
			),
		[events, startDate, endDate]
	);

	return (
		<Stack gap="xl">
			<Group justify="space-between">
				<DateFilters />
				<AddUserEvent />
			</Group>

			<Stack component="ul" gap="md" ps="0" maw="475px" w="100%" mx="auto">
				<Show
					when={filtered.length > 0}
					fallback={
						<Paper mx="auto">
							<Title>Nothing found...</Title>
						</Paper>
					}
				>
					<Each items={filtered}>
						{(event) => (
							<UserEventCard
								{...event}
								key={event.id}
								actions={(id) => (
									<Group align="center" gap="xs">
										<DeleteUserEvent id={id} />
									</Group>
								)}
							/>
						)}
					</Each>
				</Show>
			</Stack>
		</Stack>
	);
}
