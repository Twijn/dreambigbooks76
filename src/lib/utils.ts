export function transformTitleToUrl(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^a-z ]/g, "")
		.replace(/ /g, "-");
}