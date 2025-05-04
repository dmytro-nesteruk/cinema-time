import { Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";

import { AsProp } from "@shared/types/props";

import classes from "./user-event-card.module.css";

export type UserEventCardProps = AsProp & {
	id: string;
	title: string;
	startDate: string;
	endDate: string;
	actions?: (id: string) => React.ReactNode;
};

export const UserEventCard: React.FC<UserEventCardProps> = ({
	as: El = "li",
	id,
	title,
	startDate,
	endDate,
	actions
}) => {
	return (
		<El className={classes.root}>
			<Stack gap="sm">
				<Text component="h2" size="md" fw={600}>
					{title}
				</Text>

				<Stack gap="2">
					<Group className="flex items-center gap-1">
						<Text size="xs" fw={500} c="gray">
							Start
						</Text>

						<Text component="time" size="xs" c="gray">
							{dayjs(startDate).format("DD MMM YYYY, HH:mm")}
						</Text>
					</Group>
					<Group align="center" gap="xs">
						<Text size="xs" fw={500} c="gray">
							End:
						</Text>
						<Text component="time" size="xs" c="gray">
							{dayjs(endDate).format("DD MMM YYYY, HH:mm")}
						</Text>
					</Group>
				</Stack>
			</Stack>

			{actions && actions(id)}
		</El>
	);
};
