import dayjs from "dayjs";

export const DATES = {
	getMinAvailable: () => dayjs().startOf("day").startOf("day"),
	getMaxAvailable: () => dayjs().add(1, "month").endOf("day")
};
