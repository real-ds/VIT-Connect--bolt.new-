import { create } from 'zustand';
import { User, Post, Community } from '../types';
import { initialCommunities, initialPosts } from '../data/initialData';

interface Store {
  currentUser: User | null;
  posts: Post[];
  communities: Community[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  setCurrentUser: (user: User | null) => void;
  updateUserProfile: (user: User) => void;
  addPost: (post: Post) => void;
  addCommunity: (community: Community) => void;
  joinCommunity: (communityId: string, userId: string) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  loadMorePosts: () => void;
}

const POSTS_PER_PAGE = 5;

export const useStore = create<Store>((set, get) => ({
  currentUser: null,
  posts: initialPosts.slice(0, POSTS_PER_PAGE),
  communities: initialCommunities,
  page: 1,
  hasMore: initialPosts.length > POSTS_PER_PAGE,
  loading: false,
  setCurrentUser: (user) => set({ currentUser: user }),
  updateUserProfile: (user) => set({ currentUser: user }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  addCommunity: (community) => 
    set((state) => ({ communities: [...state.communities, community] })),
  joinCommunity: (communityId, userId) =>
    set((state) => ({
      communities: state.communities.map((c) =>
        c.id === communityId
          ? { ...c, members: [...c.members, userId] }
          : c
      ),
    })),
  likePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      ),
    })),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      ),
    })),
  loadMorePosts: () => {
    const { page, loading, hasMore } = get();
    
    if (loading || !hasMore) return;
    
    set({ loading: true });
    
    setTimeout(() => {
      const nextPage = page + 1;
      const start = page * POSTS_PER_PAGE;
      const end = start + POSTS_PER_PAGE;
      const newPosts = initialPosts.slice(0, end);
      
      set({
        posts: newPosts,
        page: nextPage,
        hasMore: end < initialPosts.length,
        loading: false
      });
    }, 1000);
  },
}));