import { Box, Button, Group, Input, Modal, Stack, Text } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { PlusIcon } from "lucide-react";
import React from "react";
import { Controller } from "react-hook-form";

import { DATES } from "@shared/config/dates";
import { Show } from "@shared/ui/base/show";

import { useAddUserEventForm } from "../model/use-add-user-event-form";

export const AddUserEvent = () => {
	const [opened, { open, close }] = useDisclosure(false);

	const { onSubmit, isDirty, control, addingError, reset } = useAddUserEventForm({
		onSuccess: close
	});

	const handleClose = () => {
		close();
		reset({});
	};

	return (
		<React.Fragment>
			<Button
				size="xs"
				w="fit-content"
				leftSection={<PlusIcon aria-hidden size={16} />}
				onClick={open}
			>
				Add event
			</Button>

			<Modal centered title="Add event" opened={opened} onClose={handleClose}>
				<Box component="form" onSubmit={onSubmit} id="add-user-event">
					<Stack gap="md">
						<Controller
							control={control}
							name="title"
							render={({ field, fieldState }) => (
								<Input.Wrapper label="Title" error={fieldState.error?.message}>
									<Input {...field} placeholder="Your event title..." />
								</Input.Wrapper>
							)}
						/>

						<Controller
							control={control}
							name="startDate"
							render={({ field, fieldState }) => (
								<Input.Wrapper label="Start date" error={fieldState.error?.message}>
									<DateTimePicker
										valueFormat="DD MMM YYYY, HH:mm"
										placeholder="Event start date"
										minDate={DATES.getMinAvailable().toDate()}
										maxDate={DATES.getMaxAvailable().toDate()}
										{...field}
									/>
								</Input.Wrapper>
							)}
						/>

						<Controller
							control={control}
							name="endDate"
							render={({ field, fieldState }) => (
								<Input.Wrapper label="End date" error={fieldState.error?.message}>
									<DateTimePicker
										valueFormat="DD MMM YYYY, HH:mm"
										placeholder="Event end date"
										minDate={DATES.getMinAvailable().toDate()}
										maxDate={DATES.getMaxAvailable().toDate()}
										{...field}
									/>
								</Input.Wrapper>
							)}
						/>
					</Stack>
				</Box>

				<Show when={Boolean(addingError)}>
					<Text size="xs" pt="xs" c="red">
						{addingError}
					</Text>
				</Show>

				<Group grow justify="stretch" align="center" pt="lg" gap="xs">
					<Button variant="outline">Cancel</Button>
					<Button type="submit" form="add-user-event" disabled={!isDirty}>
						Add
					</Button>
				</Group>
			</Modal>
		</React.Fragment>
	);
};
