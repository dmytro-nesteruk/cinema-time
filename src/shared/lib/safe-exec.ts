export type Success<T> = [T, null];

export type Failure<E> = [null, E];

export type Result<T, E = unknown> = Success<T> | Failure<E>;

export function safeExec<T, E = Error>(fn: () => T): Result<T, E> {
	try {
		const result = fn();

		return [result, null];
	} catch (err) {
		return [null, err as E];
	}
}

export async function safeExecAsync<T, E = Error>(fn: () => Promise<T>): Promise<Result<T, E>> {
	try {
		const result = await fn();

		return [result, null];
	} catch (err) {
		return [null, err as E];
	}
}
