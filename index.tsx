
import React, { useState, useEffect } from 'react';
import { Moon, Sun, ChevronRight, Heart, Users, BookOpen, Shield } from 'lucide-react';

const Index = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('petEmoteDarkMode') === 'enabled';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('petEmoteDarkMode', 'enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('petEmoteDarkMode');
    }
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
  };

  const handleFormSubmit = (e: React.FormEvent, formType: string) => {
    e.preventDefault();
    setModalMessage(`${formType} functionality would be implemented with Firebase authentication.`);
    setShowModal(true);
  };

  const Modal = ({ isOpen, message, onClose }: { isOpen: boolean; message: string; onClose: () => void }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
          <button 
            onClick={onClose}
            className="float-right text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
          <p className="text-gray-800 dark:text-gray-200 mb-4">{message}</p>
          <button 
            onClick={onClose}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-lavender-100 dark:from-gray-900 dark:to-purple-950 transition-all duration-500">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm sticky top-0 z-40 shadow-lg border-b border-purple-100 dark:border-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pet'emote</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { id: 'about', label: 'About' },
                { id: 'how-it-works', label: 'How It Works' },
                { id: 'login', label: 'Login' },
                { id: 'signup', label: 'Sign Up' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-semibold transition-all duration-300 relative ${
                    activeSection === item.id
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
                  )}
                </button>
              ))}
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-700 transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 dark:border-purple-800 overflow-hidden">
          
          {/* About Section */}
          {activeSection === 'about' && (
            <div className="p-8 animate-fade-in">
              <h2 className="text-4xl font-bold text-center mb-8 text-purple-600 dark:text-purple-400">
                About Pet'emote
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    What is Pet'emote?
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    <strong>Pet'emote</strong> is an innovative tool designed to help you understand your beloved cats and dogs better. We provide resources and insights to help you connect more deeply with your furry companions.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Our Mission
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    We believe a deeper understanding of our pets' feelings can lead to stronger bonds and happier lives for both pets and their owners. Pet'emote aims to bridge the communication gap, allowing you to respond more effectively to your furry friends' needs.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                    Why Join Pet'emote?
                  </h3>
                  <div className="grid gap-4">
                    {[
                      { icon: <Shield className="w-6 h-6" />, title: 'Analyzer', desc: 'Gain insights into your pet\'s behavior.' },
                      { icon: <BookOpen className="w-6 h-6" />, title: 'Articles', desc: 'Access a library of articles on pet behavior, health, and training.' },
                      { icon: <Heart className="w-6 h-6" />, title: 'Personalized Content', desc: 'Get tailored recommendations based on your pet\'s needs.' },
                      { icon: <Users className="w-6 h-6" />, title: 'Profile', desc: 'View and manage your personal details including User ID, Email, and Display Name.' }
                    ].map((feature, index) => (
                      <div key={index} className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-lg border-l-4 border-purple-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start space-x-4">
                          <div className="text-purple-600 dark:text-purple-400 mt-1">
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{feature.title}</h4>
                            <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                    Join our community and embark on a journey to a more harmonious life with your pets!
                  </p>
                  <button 
                    onClick={() => handleNavClick('signup')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 inline-flex items-center space-x-2"
                  >
                    <span>Get Started</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* How It Works Section */}
          {activeSection === 'how-it-works' && (
            <div className="p-8 animate-fade-in">
              <h2 className="text-4xl font-bold text-center mb-8 text-purple-600 dark:text-purple-400">
                How Pet'emote Works
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                    Getting Started is Easy!
                  </h3>
                  <div className="space-y-4">
                    {[
                      { step: '1', title: 'Sign Up/Login', desc: 'Create a free account or log in if you\'re already a member.' },
                      { step: '2', title: 'Explore Content', desc: 'Browse through our extensive collection of articles, tips, and guides.' },
                      { step: '3', title: 'Connect & Share', desc: 'Engage with our vibrant community forums and share your pet stories.' }
                    ].map((item, index) => (
                      <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg border-l-4 border-purple-500 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                            {item.step}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step {item.step}: {item.title}</h4>
                            <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Our Content Includes:
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Understanding Pet Body Language',
                      'Nutrition and Diet Guides',
                      'Training Tips for Dogs and Cats',
                      'Health and Wellness Advice'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
                        <ChevronRight className="w-5 h-5 text-purple-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Login Section */}
          {activeSection === 'login' && (
            <div className="p-8 animate-fade-in">
              <h2 className="text-4xl font-bold text-center mb-8 text-purple-600 dark:text-purple-400">
                Login to Pet'emote
              </h2>
              
              <form onSubmit={(e) => handleFormSubmit(e, 'Login')} className="max-w-md mx-auto space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password:
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  Login
                </button>
                
                <div className="text-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">OR</span>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleFormSubmit(new Event('click') as any, 'Google Sign-In')}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center space-x-2"
                  >
                    <span>Sign in with Google</span>
                  </button>
                </div>
                
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleNavClick('signup')}
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors"
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            </div>
          )}

          {/* Sign Up Section */}
          {activeSection === 'signup' && (
            <div className="p-8 animate-fade-in">
              <h2 className="text-4xl font-bold text-center mb-8 text-purple-600 dark:text-purple-400">
                Sign Up for Pet'emote
              </h2>
              
              <form onSubmit={(e) => handleFormSubmit(e, 'Sign Up')} className="max-w-md mx-auto space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password:
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="Confirm your password"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  Sign Up
                </button>
                
                <div className="text-center">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">OR</span>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleFormSubmit(new Event('click') as any, 'Google Sign-Up')}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center space-x-2"
                  >
                    <span>Sign up with Google</span>
                  </button>
                </div>
                
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => handleNavClick('login')}
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors"
                  >
                    Login
                  </button>
                </p>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-purple-100 dark:border-purple-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2025 Pet'emote. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modal */}
      <Modal 
        isOpen={showModal} 
        message={modalMessage} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
};

export default Index;
