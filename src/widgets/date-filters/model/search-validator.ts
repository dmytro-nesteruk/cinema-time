import dayjs from "dayjs";

import { DateFilter } from "./types";

export const validateDateSearch = (search: Record<string, unknown>): DateFilter => {
	const startDate = search?.start;
	const endDate = search?.end;

	const start = (() => {
		const isString = startDate && typeof startDate === "string";
		const isDayjs = startDate && dayjs.isDayjs(startDate);

		if ((isString || isDayjs) && dayjs(startDate).isValid()) {
			return dayjs(startDate);
		}

		return dayjs().startOf("day");
	})();

	const end = (() => {
		const isString = endDate && typeof endDate === "string";
		const isDayjs = endDate && dayjs.isDayjs(endDate);

		if ((isString || isDayjs) && dayjs(endDate).isValid()) {
			return dayjs(endDate);
		}

		return dayjs().endOf("day");
	})();

	return {
		start,
		end
	};
};
