import { ActionIcon, Button, ButtonVariant, Divider, Group, Popover } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import { ListRestartIcon } from "lucide-react";

import { DATES } from "@shared/config/dates";

import { Range, useDateFilters } from "../model/use-date-filters";

const getVariant = (isActive: boolean): ButtonVariant => (isActive ? "light" : "subtle");

export const DateFilters = () => {
	const { range, startDate, setToday, setTomorrow, setWeek, setMonth, setCustom, reset } =
		useDateFilters();

	return (
		<Group gap="sm" p="sm" pos="sticky" top={0} style={{ backdropFilter: `blur(5px)`, zIndex: 10 }}>
			<ActionIcon
				aria-label="Reset filters"
				title="Reset filters"
				size="sm"
				variant="outline"
				color="red"
				onClick={reset}
			>
				<ListRestartIcon size={16} strokeWidth={1.5} />
			</ActionIcon>

			<Divider orientation="vertical" />

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
						getDayProps={(date) => ({
							selected: startDate?.isSame(date),
							onClick: () => setCustom(date)
						})}
					/>
				</Popover.Dropdown>
			</Popover>
		</Group>
	);
};
