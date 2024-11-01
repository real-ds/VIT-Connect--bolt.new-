import React from 'react';
import { useStore } from '../store/useStore';
import CreateCommunity from './CreateCommunity';
import PostList from './PostList';

export default function Feed() {
  return (
    <div className="space-y-6">
      <CreateCommunity />
      <PostList />
    </div>
  );
}