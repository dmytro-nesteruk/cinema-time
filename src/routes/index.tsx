import { Box, Group, Paper, Stack, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import React, { useMemo } from "react";

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
	const events = useUserEventsStore((state) => state.events);
	const { startDate, endDate } = useDateFilters();

	const filtered = useMemo(() => {
		if (!startDate || !endDate) return events;

		return events.filter(
			(event) => dayjs(event.startDate).isAfter(startDate) && dayjs(event.endDate).isBefore(endDate)
		);
	}, [events, startDate, endDate]);

	return (
		<React.Fragment>
			<Stack gap="xl">
				<Group justify="space-between">
					<DateFilters />
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

			<Box pos="fixed" bottom={16} right={16}>
				<AddUserEvent />
			</Box>
		</React.Fragment>
	);
}
