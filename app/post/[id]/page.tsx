import { redirect } from "next/navigation";
import { Post } from "../../page";

async function getData(url: string) {
  const res = await fetch(url);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function Post({
  id,
  searchParams,
}: {
  id: string;
  searchParams: { show?: string };
}) {
  console.log(searchParams);
  const post: Post = await getData(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const comments = await getData(
    `https://jsonplaceholder.typicode.com/comments/?postId=${id}`
  );

  return (
    <div className="mx-10">
      <h1 className="text-2xl">{post.title}</h1>
      <p className="text-xl text-gray-700 my-4"> {post.body} </p>

      <h1 className="text-2xl my-2 underline">Comments</h1>
      {comments.map((comment: any) => (
        <ul>
          <li key={comment.id}>
            <p className="text-l"> {comment.body}</p>
            {searchParams.show === "true" && (
              <p className="bg-gray-200">{comment.email.split("@")[0]}</p>
            )}
          </li>
        </ul>
      ))}
    </div>
  );
}

export default function PostPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { show?: string };
}) {
  return (
    <section>
      <Post id={params.id} searchParams={searchParams} />
      <form
        action={async () => {
          "use server";
          redirect(`/post/${params.id}?show=true`);
        }}
      >
        <button className="bg-gray-200 px-2 m-2 rounded hover:bg-gray-300 transion-all mx-10 my-4">
          Show comments belong who
        </button>
      </form>
    </section>
  );
}
