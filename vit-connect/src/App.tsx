import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import CommunityView from './components/CommunityView';
import Profile from './components/Profile';
import { useStore } from './store/useStore';

function Login() {
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const handleLogin = () => {
    setCurrentUser({
      id: '1',
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
      role: 'student',
      department: 'Computer Science',
      bio: 'Computer Science student passionate about web development and AI.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/realdivyanshusingh',
        github: 'https://github.com/real-ds'
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">VIT Connect</h1>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Login with University ID
        </button>
      </div>
    </div>
  );
}

function App() {
  const { currentUser } = useStore();

  if (!currentUser) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex gap-8">
          <Sidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/community/:id" element={<CommunityView />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;