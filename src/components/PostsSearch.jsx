import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function PostsSearch({ posts }) {
  const [query, setQuery] = useState('');

  const filteredPosts = posts.filter(post =>
    post.data.title.toLowerCase().includes(query.toLowerCase()) ||
    post.data.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Type a keyword..."
        class="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 mb-6"
        value={query}
        onInput={(e) => setQuery(e.target.value)}
      />

      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <div
            key={post.slug}
            class="relative border border-transparent border-dashed cursor-pointer p-7 group rounded-2xl mb-4"
            onClick={() => window.location.href = `/post/${post.slug}`}
          >
            <h2 class="font-bold text-lg mb-2">{post.data.title}</h2>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">{post.data.description}</p>
            <div class="mt-2.5 text-xs font-medium text-neutral-800 dark:text-neutral-300">
              Posted on {post.data.dateFormatted}
            </div>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
