import React from 'react';

const BlogPostSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 animate-pulse">
          {/* Hero Image skeleton */}
          <div className="relative h-96 bg-gray-300"></div>
          
          {/* Content skeleton */}
          <div className="p-8">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-8"></div>
            
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
            
            <div className="h-6 bg-gray-300 rounded w-3/4 my-8"></div>
            
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <div className="bg-gray-300 h-10 w-20 rounded-full"></div>
                <div className="bg-gray-300 h-10 w-24 rounded-full"></div>
                <div className="bg-gray-300 h-10 w-24 rounded-full"></div>
                <div className="bg-gray-300 h-10 w-28 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Author info skeleton */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
            <div>
              <div className="h-5 bg-gray-300 rounded w-40 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>

        {/* Related Articles skeleton */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-7 bg-gray-300 rounded w-48 mb-6"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(item => (
              <div key={item}>
                <div className="bg-gray-300 h-40 rounded-lg mb-3"></div>
                <div className="h-5 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostSkeleton;
