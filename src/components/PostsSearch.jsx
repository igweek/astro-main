import { useState, useEffect } from 'preact/hooks';

export default function PostsSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // 加载 pagefind runtime
  useEffect(() => {
    if (!window.pagefind) {
      import('/pagefind/pagefind.js')
        .then((mod) => {
          window.pagefind = mod;
        })
        .catch((err) => {
          console.error("Failed to load Pagefind:", err);
        });
    }
  }, []);

  async function doSearch(q) {
    setQuery(q);
    if (!q) {
      setResults([]);
      return;
    }
    if (!window.pagefind) return;

    const search = await window.pagefind.search(q);
    const items = await Promise.all(search.results.map(r => r.data()));
    setResults(items);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Type a keyword..."
        class="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 mb-6"
        value={query}
        onInput={(e) => doSearch(e.target.value)}
      />
      <div class="space-y-4">
        {results.length === 0 && query !== '' ? (
          <p class="text-gray-500">No results found.</p>
        ) : null}
        {results.map((item) => (
          <div
            key={item.url}
            class="cursor-pointer border border-dashed p-5 rounded hover:bg-gray-50 dark:hover:bg-neutral-800"
            onClick={() => (window.location.href = item.url)}
          >
            <h2 class="font-semibold text-lg">
              { item.meta?.title ?? item.url }
            </h2>
            {item.excerpt && (
              <p class="text-sm text-gray-600 dark:text-gray-400">{item.excerpt}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
