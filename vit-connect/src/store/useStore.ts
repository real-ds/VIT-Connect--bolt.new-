import { create } from 'zustand';
import { collection, getDocs, query, orderBy, limit, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Post, Community, Store } from '../types';

export const useStore = create<Store>((set, get) => ({
  currentUser: null,
  posts: [],
  communities: [],
  loading: false,
  error: null,

  setCurrentUser: (user) => set({ currentUser: user }),

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const postsQuery = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        limit(10)
      );

      const snapshot = await getDocs(postsQuery);
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Post));

      set({ posts, loading: false });
    } catch (error) {
      console.error('Error fetching posts:', error);
      set({ error: 'Failed to fetch posts', loading: false });
    }
  },

  addCommunity: async (community: Community) => {
    set({ loading: true, error: null });
    try {
      const docRef = await addDoc(collection(db, 'communities'), community);
      set({
        communities: [...get().communities, { ...community, id: docRef.id }],
        loading: false,
      });
    } catch (error) {
      console.error('Error adding community:', error);
      set({ error: 'Failed to add community', loading: false });
    }
  },

  addPost: async (post: Post) => {
    set({ loading: true, error: null });
    try {
      const docRef = await addDoc(collection(db, 'posts'), post);
      set((state) => ({
        posts: [...state.posts, { ...post, id: docRef.id }],
        loading: false,
      }));
    } catch (error) {
      console.error('Error adding post:', error);
      set({ error: 'Failed to add post', loading: false });
    }
  },

  joinCommunity: (communityId: string, userId: string) => 
    set((state) => ({
      communities: state.communities.map(community =>
        community.id === communityId
          ? { ...community, members: [...community.members, userId] }
          : community
      )
    })),
}));
