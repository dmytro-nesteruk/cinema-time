import { ActionIcon } from "@mantine/core";
import { XIcon } from "lucide-react";

import { useDeleteUserEvent } from "../model/use-delete-user-event";

export type DeleteUserEventProps = {
	id: string;
};

export const DeleteUserEvent: React.FC<DeleteUserEventProps> = ({ id }) => {
	const deleteEvent = useDeleteUserEvent();

	return (
		<ActionIcon
			variant="outline"
			color="red"
			size="sm"
			aria-label="Delete event"
			title="Delete event"
			onClick={() => deleteEvent(id)}
		>
			<XIcon size={16} strokeWidth={1.5} />
		</ActionIcon>
	);
};
