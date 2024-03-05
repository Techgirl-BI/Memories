import { useEffect, useState } from 'react';
import axios from 'axios';

const PersonalizedFeed = () => {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    // Fetch personalized feed data from backend API
    const fetchFeed = async () => {
      try {
        const response = await axios.get('http://localhost:5005/feed');
        setFeed(response.data); // Assuming response.data is an array of feed items
      } catch (error) {
        console.error('Error fetching feed:', error);
      }
    };

    fetchFeed();
  }, []); // Fetch feed data only once when component mounts

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Personalized Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feed.map(item => (
          <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
            {/* Display feed item content */}
            <p className="text-lg font-semibold mb-2">{item.title}</p>
            <p className="text-gray-600">{item.description}</p>
            {/* Add more elements to display other feed item details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedFeed;
