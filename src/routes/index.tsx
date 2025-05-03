import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@shared/ui/base/button";

export const Route = createFileRoute("/")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<div className="p-2">
			<h1>Welcome Home!</h1>
			<Button variant="default">Hello</Button>
		</div>
	);
}
