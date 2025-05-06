import { Button } from "@mantine/core";

import { useBookSession } from "../model/book-session";

export type BookSessionProps = {
	id: string;
	startDate: string;
	title: string;
};

export const BookSession: React.FC<BookSessionProps> = ({ id, startDate, title }) => {
	const { bookSession } = useBookSession();

	const book = () => {
		bookSession({ id, startDate });
	};

	return <Button onClick={book}>{title}</Button>;
};
