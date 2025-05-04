import { Button, ButtonVariant, Group, Popover } from "@mantine/core";
import { Calendar } from "@mantine/dates";

import { DATES } from "@shared/config/dates";

import { Range, useDateFilters } from "../model/use-date-filters";

const getVariant = (isActive: boolean): ButtonVariant => (isActive ? "light" : "subtle");

export const DateFilters = () => {
	const { range, startDate, setToday, setTomorrow, setWeek, setMonth, setCustom } =
		useDateFilters();

	return (
		<Group>
			<Button size="xs" variant={getVariant(range === Range.Today)} onClick={setToday}>
				Today
			</Button>

			<Button size="xs" variant={getVariant(range === Range.Tomorrow)} onClick={setTomorrow}>
				Tomorrow
			</Button>

			<Button size="xs" variant={getVariant(range === Range.Week)} onClick={setWeek}>
				Week
			</Button>

			<Button size="xs" variant={getVariant(range === Range.Month)} onClick={setMonth}>
				Month
			</Button>

			<Popover withArrow position="bottom-start">
				<Popover.Target>
					<Button size="xs" variant={getVariant(range === Range.Custom)}>
						Custom
					</Button>
				</Popover.Target>

				<Popover.Dropdown>
					<Calendar
						minDate={DATES.getMinAvailable().toDate()}
						maxDate={DATES.getMaxAvailable().toDate()}
						getDayProps={(date) => ({
							selected: startDate.isSame(date),
							onClick: () => setCustom(date)
						})}
					/>
				</Popover.Dropdown>
			</Popover>
		</Group>
	);
};
