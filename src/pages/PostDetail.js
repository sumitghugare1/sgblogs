import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { postId } = useParams();

  const posts = [
    {
      id: 1,
      title: 'Unlocking the Power of 5G:',
      date: 'August 10, 2024',
      content: '5G is the 5th generation mobile network. It is a new global wireless standard after 1G, 2G, 3G, and 4G networks. 5G enables a new kind of network that is designed to connect virtually everyone and everything together including machines, objects, and devices. 5G wireless technology is meant to deliver higher multi-Gbps peak data speeds, ultra-low latency, more reliability, massive network capacity, increased availability, and a more uniform user experience to more users. Higher performance and improved efficiency empower new user experiences and connects new industries.',
      imageUrl: 'https://st4.depositphotos.com/2673929/25904/i/450/depositphotos_259048638-stock-photo-5g-circuit-board-with-network.jpg',
    },
    {
      id: 2,
      title: 'AMD vs Intel: Which CPUs Are Better in 2023?',
      date: 'August 12, 2024',
      content: 'When evaluating the latest CPU offerings, Intel and AMD present their unique takes on power and performance. Previously its top-of-the-line CPU, Intel’s Core i9-13900K commands attention with its 24 cores and 32 threads, and its high boost clock of 5.8 GHz is impressive. It maintains a TDP of 125W but can push to 253W for peak performance. However, Intel’s Raptor Lake refresh that was released in October saw the i9 14900K, built upon the Raptor Lake architecture, reach speeds of up to 6 GHz. On the other hand, AMD’s Ryzen 9 7950X3D stakes its claim with a 144MB cache and an efficient energy profile, topping at 162W under full load. It can also almost match Intel’s capabilities, with a boosted clock speed of 5.7 GHz, without draining that much power. Intel’s strengths lie in its architectural design, which delivers a balanced performance that’s tough to beat. The Core i9-13900K stands out for its ability to handle intensive multi-threaded tasks without breaking a sweat, making it ideal for both gaming and productivity. The downside? These chips can be power-hungry under load, which might lead to higher energy bills and the need for better desktop cooling solutions. Annoyingly, it seems that the refreshed 14th Gen chips are no exception, and although deliver better performance, haven’t been blessed with lower power consumption.',
      imageUrl: 'https://www.shutterstock.com/image-photo/santa-clara-calif-march-31-600nw-1946594854.jpg',
    },
    {
      id: 3,
      title: 'Getting Started with Tailwind CSS',
      date: 'August 14, 2024',
      content: 'Tailwind CSS is a game-changer for frontend developers. In this post, you’ll learn how to set up Tailwind CSS in your project and use its utility classes to build responsive and modern UIs efficiently.',
      imageUrl: 'https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/374d531975a82ee377267f815c43549e',
    },
    {
      id: 4,
      title: 'Advanced React Patterns',
      date: 'August 16, 2024',
      content: 'This post introduces advanced patterns in React that help you write more reusable and maintainable code. Learn about Render Props, Higher-Order Components, and Custom Hooks, and see examples of how to implement them in your projects.',
      imageUrl: 'https://d2ms8rpfqc4h24.cloudfront.net/list_of_advanced_reactjs_design_patterns_2_bf57eb06d1.jpg',
    },
    {
      id: 5,
      title: 'Optimizing React Performance',
      date: 'August 18, 2024',
      content: 'Performance is key to a great user experience. This post covers techniques like code splitting, lazy loading, and memoization to help you optimize your React applications for better performance and faster load times.',
      imageUrl: 'https://clickysoft.com/wp-content/uploads/2023/05/React-Performance-Optimization-1536x864-1.jpg',
    },
    {
      id: 6,
      title: 'Building Accessible React Apps',
      date: 'August 20, 2024',
      content: 'Accessibility should be a priority in web development. In this post, you’ll learn best practices for building accessible React applications, including using semantic HTML, ARIA attributes, and accessible form controls.',
      imageUrl: 'https://images.ctfassets.net/s600jj41gsex/336v6qodKUybJ7KZztKyiL/cb4079e45a50a4bb3c6b0a8bd082c1ec/How_to_enrich_React_textarea_with_TinyMCE.png?w=768&q=50&fit=scale',
    },
  ];

  const post = posts.find((post) => post.id === parseInt(postId));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-500 text-sm mb-4">{post.date}</p>
          <p className="text-gray-700 mb-4">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
