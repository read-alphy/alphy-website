// WelcomeExplainer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Components
import HeroSection from './HeroSection';

import PlatformSection from './PlatformSection';
import FooterMainPage from './FooterMainPage';
import FlagArea from './FlagsArea';
import ValueCards from './ValueCards';

// Dynamically import AboutMainPage to reduce initial load time
const AboutMainPage = dynamic(() => import('./AboutMainPage'), {
  ssr: false,
});

export default function WelcomeExplainer({
  currentUser,
  totalMinutes,
  setTotalMinutes,
  loggedIn,
  setLoggedIn,
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch stats only if needed
    if (totalMinutes === 0) {
      fetchStats();
    } else {
      setIsLoading(false);
    }
  }, [totalMinutes]);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/stats`);
      if (res.data.total_mins !== undefined && res.data.total_mins !== null) {
        setTotalMinutes(res.data.total_mins);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="w-full max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <HeroSection currentUser={currentUser} />


        {/* Supported Platforms Section */}
        <PlatformSection />

        {/* Divider */}
        <motion.div 
          className="w-full h-px bg-slate-200 dark:bg-zinc-700 mt-20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        ></motion.div>

        {/* Feature Cards Section */}
        <ValueCards />

        {/* Language Support Section */}
        <FlagArea />

        {/* About Section */}
        <motion.div 
          className="mt-16 md:mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ 
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8 } }
          }}
        >
          <AboutMainPage />
        </motion.div>
      </main>

      {/* Footer for mobile only */}
      <motion.div 
        className="sm:hidden mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <FooterMainPage currentUser={currentUser} />
      </motion.div>
    </div>
  );
}