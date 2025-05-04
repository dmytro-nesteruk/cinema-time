import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUserEventsStore } from "@entities/user-event";

import { safeExec } from "@shared/lib/safe-exec";

import { addUserEventValidationSchema } from "./add-user-event-validation-schema";

type Form = z.infer<typeof addUserEventValidationSchema>;

type UseAddUserEventFormProps = {
	onSuccess?: () => void;
};

const DEFAULT_VALUES: Partial<Form> = {
	title: "",
	startDate: undefined,
	endDate: undefined
};

export const useAddUserEventForm = ({ onSuccess }: UseAddUserEventFormProps) => {
	const addEvent = useUserEventsStore((state) => state.add);

	const {
		handleSubmit,
		control,
		reset,
		formState: { isDirty }
	} = useForm<Form>({
		resolver: zodResolver(addUserEventValidationSchema),
		defaultValues: { ...DEFAULT_VALUES }
	});

	const [addingError, setAddingError] = useState("");

	const onSubmit = handleSubmit((data) => {
		const { 1: error } = safeExec(() => {
			addEvent({
				id: crypto.randomUUID(),
				title: data.title,
				startDate: data.startDate.toISOString(),
				endDate: data.endDate.toISOString()
			});
		});

		if (error) {
			setAddingError(error.message);
			return;
		}

		setAddingError("");
		reset({ ...DEFAULT_VALUES });

		if (onSuccess) onSuccess();
	});

	return {
		onSubmit,
		reset,
		control,
		isDirty,
		addingError
	};
};
