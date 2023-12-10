import Link from "next/link";

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export type Post = {
  userId: string;
  id: string;
  title: string;
  body: string;
};

async function Posts() {
  const posts: Post[] = await getPosts();

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="underline">
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <section>
      <h1 className="text-2xl font-semibold">All Posts</h1>
      <Posts />
    </section>
  );
}
