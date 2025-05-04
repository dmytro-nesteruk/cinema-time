import React from "react";

export type ShowProps = {
	children: React.ReactNode;
	when: boolean;
	fallback?: React.ReactNode;
};

const _Show: React.FC<ShowProps> = ({ children, when, fallback }) => {
	if (when) {
		return children;
	}

	return fallback ?? null;
};

export const Show = React.memo(_Show);
