import type {PageServerLoad} from "./$types";
import { books } from "$lib/data/books.json";
import { error } from '@sveltejs/kit';
import { transformTitleToUrl } from '$lib/utils';

export const load: PageServerLoad = async ({ params }) => {
	const { name } = params;
	const book = books.find(x => transformTitleToUrl(x.title) === name);

	if (!book) {
		return error(404);
	}

	return {
		book,
	};
}
