import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, Send, Camera, Smile } from 'lucide-react';
import type { SocialPost } from '../types';

interface SocialFeedProps {
  posts: SocialPost[];
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
}

export const SocialFeed: React.FC<SocialFeedProps> = ({ posts, onLike, onComment }) => {
  const [newPost, setNewPost] = useState('');
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
    onLike(postId);
  };

  const handleComment = (postId: string) => {
    const comment = commentInputs[postId];
    if (comment?.trim()) {
      onComment(postId, comment);
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    }
  };

  const toggleComments = (postId: string) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="text-center py-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white">
        <h1 className="text-2xl font-bold mb-2">📱 Social Feed</h1>
        <p className="text-indigo-100">Share your gala moments</p>
      </div>

      {/* Create Post */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-lg">👤</span>
          </div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your thoughts about the gala..."
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Camera size={16} />
                  <span>Photo</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Smile size={16} />
                  <span>Emoji</span>
                </button>
              </div>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={!newPost.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Post Header */}
            <div className="p-4 flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-lg">{post.avatar}</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{post.author}</div>
                <div className="text-sm text-gray-500">{post.timestamp}</div>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3">
              <p className="text-gray-800 leading-relaxed">{post.content}</p>
              {post.image && (
                <div className="mt-3 rounded-lg overflow-hidden">
                  <img src={post.image} alt="Post content" className="w-full h-48 object-cover" />
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="px-4 py-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex space-x-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-2 transition-all duration-200 ${
                      likedPosts.has(post.id)
                        ? 'text-red-500 scale-110'
                        : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart 
                      size={20} 
                      className={likedPosts.has(post.id) ? 'fill-current' : ''} 
                    />
                    <span className="text-sm font-medium">
                      {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <MessageCircle size={20} />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                    <Share size={20} />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              {showComments[post.id] && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="space-y-3 mb-4">
                    {/* Sample comments */}
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xs">👤</span>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg px-3 py-2">
                          <div className="font-medium text-sm">John D.</div>
                          <div className="text-sm text-gray-700">Amazing match! 🔥</div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">5 min ago</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Add Comment */}
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">👤</span>
                    </div>
                    <div className="flex-1 flex space-x-2">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                        placeholder="Write a comment..."
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                      />
                      <button
                        onClick={() => handleComment(post.id)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          Load More Posts
        </button>
      </div>
    </div>
  );
};