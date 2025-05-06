import { Button, ButtonProps } from "@mantine/core";
import { LinkComponent, createLink } from "@tanstack/react-router";
import React from "react";

const LinkButtonComponent = React.forwardRef<HTMLAnchorElement, ButtonProps>((props, ref) => (
	<Button ref={ref} component="a" {...props} />
));

const CreatedButtonLinkComponent = createLink(LinkButtonComponent);

export const LinkButton: LinkComponent<typeof LinkButtonComponent> = (props) => {
	return <CreatedButtonLinkComponent preload={"intent"} {...props} />;
};
