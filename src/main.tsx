// @ts-expect-error no-error
import "@fontsource-variable/montserrat";
import { MantineColorsTuple, MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { routeTree } from "./routeTree.gen";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const myColor: MantineColorsTuple = [
	"#dffbff",
	"#caf2ff",
	"#99e2ff",
	"#64d2ff",
	"#3cc4fe",
	"#23bcfe",
	"#09b8ff",
	"#00a1e4",
	"#008fcd",
	"#007cb6"
];

const theme = createTheme({
	fontFamily: "Montserrat Variable, sans-serif",
	colors: {
		lblue: myColor
	},
	defaultRadius: "sm",
	primaryColor: "lblue"
});

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<MantineProvider theme={theme} defaultColorScheme="light">
				<Notifications position="top-right" zIndex={100} />
				<RouterProvider router={router} />
			</MantineProvider>
		</StrictMode>
	);
}
