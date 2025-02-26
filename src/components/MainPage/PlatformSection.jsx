// PlatformSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import PlatformIcon from './PlatformIcon';

// Images
import Twitch from '../../../public/img/twitch_full.png';
import Twitter from '../../../public/img/x_square.jpg';
import Youtube from '../../../public/img/youtube.png';
import ApplePodcast from '../../../public/img/apple_podcasts.png';
import Spaces from '../../../public/img/spaces_square.png';

export default function PlatformSection() {
  // Platform data for consistent rendering
  const platforms = [
    {
      icon: <AudioFileIcon 
              sx={{
                color: "#3b82f6",
                width: "80px",
                height: "64px",
              }}
            />,
      name: "Local Audio Files",
      alt: "Local Audio Files icon",
      isCustom: true
    },
    {
      icon: Youtube,
      name: "YouTube",
      alt: "YouTube logo"
    },
    {
      icon: Twitter,
      name: "Twitter Videos",
      alt: "Twitter / X logo"
    },
    {
      icon: Spaces,
      name: "Twitter Spaces",
      alt: "Twitter / X Spaces logo"
    },
    {
      icon: Twitch,
      name: "Twitch",
      alt: "Twitch logo"
    },
    {
      icon: ApplePodcast,
      name: "Apple Podcasts",
      alt: "Apple Podcasts logo"
    }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const slideUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  return (
    <motion.section 
      className="mt-16 md:mt-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
    >
      <h2 className="sr-only">Supported Platforms</h2>
      <motion.div 
        className="grid grid-cols-3 sm:grid-cols-6 gap-4 md:gap-6"
        variants={staggerChildren}
      >
        {platforms.map((platform, index) => (
          <motion.div 
            key={index}
            variants={slideUp}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <PlatformIcon
              icon={platform.icon}
              name={platform.name}
              alt={platform.alt}
              isCustom={platform.isCustom}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}