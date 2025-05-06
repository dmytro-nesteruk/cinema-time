import { Box, Grid, Paper, Stack, Text } from "@mantine/core";

import { Show } from "@shared/ui/base/show";

export type MovieSessionCardProps = {
	id: string;
	isAvailable: boolean;
	startDate: string;
	endDate: string;
	conflict?: string;
	actions?: (id: string) => React.ReactNode;
};

export const MovieSessionCard: React.FC<MovieSessionCardProps> = ({
	id,
	isAvailable,
	startDate,
	endDate,
	conflict,
	actions
}) => {
	return (
		<Paper withBorder pos="relative" radius="md" p="sm" key={id} style={{ overflow: "hidden" }}>
			<Box pos="absolute" left={0} top={0} bottom={0} w={4} bg={isAvailable ? "green" : "red"} />

			<Stack>
				<Grid gutter="0" align="center">
					<Grid.Col span={2}>
						<Text size="xs" fw={500} c="gray">
							Start:
						</Text>
					</Grid.Col>
					<Grid.Col span={10}>
						<Text component="time" size="xs" c="gray">
							{startDate}
						</Text>
					</Grid.Col>
					<Grid.Col span={2}>
						<Text size="xs" fw={500} c="gray">
							End:
						</Text>
					</Grid.Col>

					<Grid.Col span={10}>
						<Text component="time" size="xs" c="gray">
							{endDate}
						</Text>
					</Grid.Col>
				</Grid>

				<Show when={Boolean(conflict)}>
					<Text component="p" size="sm" c="red" fw={600}>
						Conflict: {conflict}
					</Text>
				</Show>

				{actions && actions(id)}
			</Stack>
		</Paper>
	);
};
