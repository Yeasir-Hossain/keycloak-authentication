import redis from "../controllers/redis";

export const cacheKey = {
	list: () => "GET:/text",
	one: (id: string) => `GET:/text:${id}`,
	words: (id: string) => `GET:/text:${id}:words`,
	characters: (id: string) => `GET:/text:${id}:characters`,
	sentences: (id: string) => `GET:/text:${id}:sentences`,
	paragraphs: (id: string) => `GET:/text:${id}:paragraphs`,
	longestWords: (id: string) => `GET:/text:${id}:longest-words`,
};

export const invalidateCache = async (id: string) => {
	const keysToInvalidate = [
		cacheKey.list(),
		cacheKey.one(id),
		cacheKey.words(id),
		cacheKey.characters(id),
		cacheKey.sentences(id),
		cacheKey.paragraphs(id),
		cacheKey.longestWords(id),
	];

	await Promise.all(keysToInvalidate.map((key) => redis.removeValue(key)));
};
