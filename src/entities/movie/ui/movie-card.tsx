import { Card, Divider, Image, Stack, Text } from "@mantine/core";
import React from "react";

export type MovieCardProps = {
	title: string;
	description: string;
	poster: string;
	duration: number;
	actions: () => React.ReactNode;
};

export const MovieCard: React.FC<MovieCardProps> = ({
	title,
	description,
	poster,
	duration,
	actions
}) => {
	return (
		<Card withBorder shadow="sm" padding="lg" radius="md" h="100%">
			<Card.Section>
				<Image src={poster} height={180} fit="cover" />
			</Card.Section>

			<Stack mt="md" mb="xs" style={{ flexGrow: 1 }}>
				<Stack style={{ flexGrow: 1 }}>
					<Text component="h2" fw={500}>
						{title}
					</Text>

					<Text size="sm">{description}</Text>
				</Stack>

				<Divider orientation="horizontal" />

				<Text size="xs">Duration: {duration} m</Text>
			</Stack>

			{actions()}
		</Card>
	);
};
