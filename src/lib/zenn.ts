/**
 * Articles published on Zenn, fetched once per build. The Japanese Writing list shows
 * them next to the site's own articles and links out to zenn.dev, so a rebuild is what
 * picks up a new one.
 */
const USERNAME = 'yutti';

export interface ZennArticle {
	title: string;
	url: string;
	date: Date;
}

interface ApiResponse {
	articles: { title: string; path: string; published_at: string }[];
	next_page: number | null;
}

let articles: Promise<ZennArticle[]> | undefined;

/** Every page asks for the list; the API is called once per build. */
export const getZennArticles = (): Promise<ZennArticle[]> => (articles ??= fetchAll());

const fetchAll = async (): Promise<ZennArticle[]> => {
	const all: ZennArticle[] = [];
	try {
		for (let page: number | null = 1; page !== null; ) {
			const res = await fetch(`https://zenn.dev/api/articles?username=${USERNAME}&order=latest&page=${page}`);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = (await res.json()) as ApiResponse;
			all.push(
				...data.articles.map((a) => ({ title: a.title, url: `https://zenn.dev${a.path}`, date: new Date(a.published_at) })),
			);
			page = data.next_page;
		}
	} catch (error) {
		// A Zenn outage shouldn't block a deploy; the next build picks the articles up again.
		console.warn(`[zenn] Building without Zenn articles: ${error}`);
		return [];
	}
	return all;
};
