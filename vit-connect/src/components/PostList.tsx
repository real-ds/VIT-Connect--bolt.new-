import { useState } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
}

interface PostListProps {
  communityId: string;
}

export default function PostList({ communityId }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <div>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-item">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
