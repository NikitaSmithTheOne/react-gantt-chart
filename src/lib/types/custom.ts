export type OptionalKeys<T extends object> = {
	[P in keyof T]: {} extends Pick<T, P> ? P : never;
}[keyof T];
