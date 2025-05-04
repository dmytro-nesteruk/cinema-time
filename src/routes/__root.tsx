import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { type DateFilter, validateDateSearch } from "@widgets/date-filters";

import { MainLayout } from "@shared/ui/layouts/main";

export const Route = createRootRoute({
	component: () => (
		<MainLayout>
			<Outlet />
			<TanStackRouterDevtools />
		</MainLayout>
	),
	validateSearch: (search: Record<string, unknown>): DateFilter => ({
		...validateDateSearch(search)
	})
});
