import { useRouter, useSearch } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useMemo } from "react";

const todayStart = dayjs().startOf("day");
const todayEnd = dayjs().endOf("day");
const tomorrowStart = dayjs().add(1, "day").startOf("day");
const tomorrowEnd = dayjs().add(1, "day").endOf("day");
const weekEnd = dayjs().add(1, "week").endOf("day");
const monthEnd = dayjs().add(1, "month").endOf("day");

export enum Range {
	Today = "TODAY",
	Tomorrow = "TOMORROW",
	Week = "WEEK",
	Month = "MONTH",
	Custom = "CUSTOM",
	AnyTime = "ANY"
}

export const useDateFilters = () => {
	const router = useRouter();

	const startDate = useSearch({ strict: true, from: "__root__", select: (search) => search.start });
	const endDate = useSearch({ strict: true, from: "__root__", select: (search) => search.end });

	const range = useMemo(() => {
		if (!startDate || !endDate) return Range.AnyTime;

		if (startDate.isSame(todayStart) && endDate.isSame(todayEnd)) return Range.Today;

		if (startDate.isSame(tomorrowStart) && endDate.isSame(tomorrowEnd)) return Range.Tomorrow;

		if (startDate.isSame(todayStart) && endDate.isSame(weekEnd)) return Range.Week;

		if (startDate.isSame(todayStart) && endDate.isSame(monthEnd)) return Range.Month;

		return Range.Custom;
	}, [startDate, endDate]);

	const setToday = () => {
		router.navigate({
			replace: true,
			to: router.latestLocation.pathname,
			search: {
				start: dayjs().startOf("day"),
				end: dayjs().endOf("day")
			}
		});
	};

	const setTomorrow = () => {
		router.navigate({
			replace: true,
			to: router.latestLocation.pathname,
			search: {
				start: dayjs().add(1, "day").startOf("day"),
				end: dayjs().add(1, "day").endOf("day")
			}
		});
	};

	const setWeek = () => {
		router.navigate({
			replace: true,
			to: router.latestLocation.pathname,
			search: {
				start: dayjs().startOf("day"),
				end: dayjs().add(1, "week").endOf("day")
			}
		});
	};

	const setMonth = () => {
		router.navigate({
			replace: true,
			to: router.latestLocation.pathname,
			search: {
				start: dayjs().startOf("day"),
				end: dayjs().add(1, "month").endOf("day")
			}
		});
	};

	const setCustom = (date: Date) => {
		if (!dayjs(date).isValid()) return;

		router.navigate({
			replace: true,
			to: router.latestLocation.pathname,
			search: {
				start: dayjs(date).startOf("day"),
				end: dayjs(date).endOf("day")
			}
		});
	};

	const reset = () => {
		router.navigate({
			replace: true,
			to: router.latestLocation.pathname
		});
	};

	return {
		startDate,
		endDate,

		setToday,
		setTomorrow,
		setWeek,
		setMonth,
		setCustom,
		reset,

		range
	};
};
