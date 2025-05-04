import { Divider, Grid, Group, Paper, Stack, Text } from "@mantine/core";
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
			<Group wrap="nowrap" justify="space-between" align="flex-start" gap="xs">
				<Stack gap="sm" style={{ flexGrow: 1 }}>
					<Text component="h2" size="md" fw={600}>
						{title}
					</Text>

					<Divider orientation="horizontal" />

					<Grid gutter="0" align="center">
						<Grid.Col span={2}>
							<Text size="xs" fw={500} c="gray">
								Start:
							</Text>
						</Grid.Col>
						<Grid.Col span={10}>
							<Text component="time" size="xs" c="gray">
								{dayjs(startDate).format("DD MMM YYYY, HH:mm")}
							</Text>
						</Grid.Col>
						<Grid.Col span={2}>
							<Text size="xs" fw={500} c="gray">
								End:
							</Text>
						</Grid.Col>

						<Grid.Col span={10}>
							<Text component="time" size="xs" c="gray">
								{dayjs(endDate).format("DD MMM YYYY, HH:mm")}
							</Text>
						</Grid.Col>
					</Grid>
				</Stack>

				{actions && actions(id)}
			</Group>
		</Paper>
	);
};
