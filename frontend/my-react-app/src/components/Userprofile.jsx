import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`http://localhost:5005/users/${userId}`);
      const data = await response.json();
      setUser(data);

      // const responsePosts = await fetch(`https://your-api.com/users/${userId}/posts`);
      // const postsData = await responsePosts.json();
      // setPosts(postsData);
    };

    fetchUserData();
  }, [userId]);

  if (!user) {
    return <div>Loading user...</div>;
  }

  return (
    <div className="p-4 mx-auto max-w-md">
      <div className="flex items-center mb-4">
        <img
          className="w-20 h-20 rounded-full mr-4"
          src={user.avatar}
          alt={user.username}
        />
        <div>
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-600">{user.bio}</p>
        </div>
      </div>
      <div className="mb-4">
        {user.links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            className="inline-block mr-4 text-blue-500 hover:underline"
          >
            {link.text}
          </a>
        ))}
      </div>
      <h3 className="text-xl font-bold mb-2">Posts</h3>
      {/* <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-2">
            <p className="text-gray-700">{post.content}</p>
            {post.image && (
              <img
                className="w-full mt-2"
                src={post.image}
                alt={`Post by ${user.username}`}
              />
            )}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default UserProfile;
