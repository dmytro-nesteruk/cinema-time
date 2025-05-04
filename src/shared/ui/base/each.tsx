import React from "react";

export type EachProps<T> = {
	items: T[];
	children: (item: T, index: number) => React.ReactNode;
};

export const Each = <T,>({ items, children }: EachProps<T>) => {
	return items.map(children);
};
