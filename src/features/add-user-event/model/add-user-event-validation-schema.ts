import dayjs from "dayjs";
import { z } from "zod";

export const addUserEventValidationSchema = z
	.object({
		title: z
			.string({ required_error: "This field is required" })
			.trim()
			.nonempty("This field can't be empty"),

		startDate: z
			.date({ required_error: "This field is required" })
			.min(new Date(), "Date can't be in past time"),

		endDate: z.date({ required_error: "This field is required" })
	})
	.superRefine((data, ctx) => {
		if (dayjs(data.endDate).isBefore(data.startDate)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "End date can't be earlier than start date",
				path: ["endDate"]
			});

			return false;
		}

		return true;
	});
