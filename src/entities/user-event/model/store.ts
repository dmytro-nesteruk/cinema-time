import dayjs from "dayjs";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { UserEvent } from "@shared/models/user-event";

type UserEventsStore = {
	events: UserEvent[];
	add: (event: UserEvent) => void;
	update: (event: UserEvent) => void;
	delete: (id: UserEvent["id"]) => void;
};

export const useUserEventsStore = create<UserEventsStore>()(
	persist(
		(set, get) => ({
			events: [],
			/* Handlers */
			add: (event: UserEvent) => {
				const prev = get().events;

				const alreadyHasAnEvent = prev.some((ev) => {
					const startDate = dayjs(event.startDate);
					const endDate = dayjs(event.endDate);

					const isStartTheSameToStart = startDate.isSame(ev.startDate);
					const isStartTheSameToEnd = startDate.isSame(ev.endDate);
					const isEndTheSameToStart = endDate.isSame(ev.startDate);
					const isEndTheSameToEnd = endDate.isSame(ev.endDate);

					const isEndHasOverlaping =
						endDate.isBefore(ev.startDate) && endDate.isSame(ev.startDate, "day");

					const isStartHasOverlaping =
						startDate.isBefore(ev.endDate) && startDate.isAfter(ev.startDate);

					return (
						isStartHasOverlaping ||
						isEndHasOverlaping ||
						isStartTheSameToStart ||
						isStartTheSameToEnd ||
						isEndTheSameToStart ||
						isEndTheSameToEnd
					);
				});

				if (alreadyHasAnEvent) {
					throw new Error("You already have an event in this time range");
				}

				set({
					events: [...get().events, event].sort((a, b) => dayjs(a.startDate).diff(b.startDate))
				});
			},

			update: (event: UserEvent) => {
				const prev = get().events;

				const idx = prev.findIndex((e) => e.id === event.id);

				const next = [...prev];

				next[idx] = event;

				set({ events: next });
			},

			delete: (id: UserEvent["id"]) => {
				set({ events: get().events.filter((event) => event.id !== id) });
			}
		}),
		{
			name: "user-events",
			storage: createJSONStorage(() => localStorage)
		}
	)
);
