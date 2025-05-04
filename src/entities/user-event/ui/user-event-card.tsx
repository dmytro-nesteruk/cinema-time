import { Divider, Group, Paper, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";

export type UserEventCardProps = {
	id: string;
	title: string;
	startDate: string;
	endDate: string;
	actions?: (id: string) => React.ReactNode;
};

export const UserEventCard: React.FC<UserEventCardProps> = ({
	id,
	title,
	startDate,
	endDate,
	actions
}) => {
	return (
		<Paper component="li" radius="md" withBorder p="sm" shadow="sm">
			<Group justify="space-between" align="flex-start" gap="xs">
				<Stack gap="sm" style={{ flexGrow: 1 }}>
					<Text component="h2" size="md" fw={600}>
						{title}
					</Text>

					<Divider orientation="horizontal" />

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
			</Group>
		</Paper>
	);
};
