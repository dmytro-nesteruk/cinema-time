import { Box } from "@mantine/core";
import { Outlet } from "@tanstack/react-router";

import { useDateFilters } from "@widgets/date-filters";

import { LinkButton } from "../base/link-button";

import classes from "./main.module.css";

export const MainLayout: React.FC<React.PropsWithChildren> = () => {
	const { startDate, endDate } = useDateFilters();

	return (
		<Box className={classes.main}>
			<Box className={classes.header}>
				<Box className={classes.navigation}>
					<LinkButton
						to="/"
						search={{ start: startDate, end: endDate }}
						variant="outline"
						className={classes.link}
						activeOptions={{ exact: false, includeSearch: false }}
					>
						Your events
					</LinkButton>

					<LinkButton
						to="/sessions"
						search={{ start: startDate, end: endDate }}
						variant="outline"
						className={classes.link}
						activeOptions={{ exact: false, includeSearch: false }}
					>
						Available Sessions
					</LinkButton>
				</Box>
			</Box>

			<Box className={classes.content}>
				<Outlet />
			</Box>
		</Box>
	);
};
