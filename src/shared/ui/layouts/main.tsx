import { Box, Button } from "@mantine/core";
import { Link, Outlet } from "@tanstack/react-router";

import { useDateFilters } from "@widgets/date-filters";

import classes from "./main.module.css";

export const MainLayout: React.FC<React.PropsWithChildren> = () => {
	const { startDate, endDate } = useDateFilters();

	return (
		<Box className={classes.main}>
			<Box className={classes.header}>
				<Box className={classes.navigation}>
					<Button
						component={Link}
						to="/"
						// @ts-expect-error wrong type infering
						search={{ start: startDate, end: endDate }}
						variant="outline"
						className={classes.link}
						activeOptions={{ exact: false, includeSearch: false }}
					>
						Your events
					</Button>

					<Button
						component={Link}
						to="/sessions"
						// @ts-expect-error wrong type infering
						search={{ start: startDate, end: endDate }}
						variant="outline"
						className={classes.link}
						activeOptions={{ exact: false, includeSearch: false }}
					>
						Available Sessions
					</Button>
				</Box>
			</Box>

			<Box className={classes.content}>
				<Outlet />
			</Box>
		</Box>
	);
};
