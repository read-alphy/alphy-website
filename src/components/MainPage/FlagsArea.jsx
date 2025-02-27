import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FlagsArea() {
  const languages = [
    { language: 'English', country_code: 'gb' }, // United Kingdom
    { language: 'Chinese', country_code: 'cn' }, // China
    { language: 'Spanish', country_code: 'es' }, // Spain
    { language: 'Turkish', country_code: 'tr' }, // Turkey
    { language: 'German', country_code: 'de' }, // Germany
    { language: 'Arabic', country_code: 'sa' }, // Saudi Arabia
    { language: 'French', country_code: 'fr' }, // France
    { language: 'Hindi', country_code: 'in' }, // India
    { language: 'Afrikaans', country_code: 'za' }, // South Africa

    { language: 'Armenian', country_code: 'am' }, // Armenia
    { language: 'Azerbaijani', country_code: 'az' }, // Azerbaijan
    /* {language: "Belarusian", country_code: "by"}, // Belarus */
    /* {language: "Bosnian", country_code: "ba"}, // Bosnia and Herzegovina */
    { language: 'Bulgarian', country_code: 'bg' }, // Bulgaria
    /* {language: "Catalan", country_code: "es"}, // Spain */
    { language: 'Croatian', country_code: 'hr' }, // Croatia
    { language: 'Czech', country_code: 'cz' }, // Czech Republic
    { language: 'Danish', country_code: 'dk' }, // Denmark
    { language: 'Dutch', country_code: 'nl' }, // Netherlands
    { language: 'Estonian', country_code: 'ee' }, // Estonia
    { language: 'Finnish', country_code: 'fi' }, // Finland
    /* {language: "Galician", country_code: "es"}, // Spain */
    { language: 'Greek', country_code: 'gr' }, // Greece
    { language: 'Hebrew', country_code: 'il' }, // Israel
    { language: 'Hungarian', country_code: 'hu' }, // Hungary
    { language: 'Icelandic', country_code: 'is' }, // Iceland
    { language: 'Indonesian', country_code: 'id' }, // Indonesia
    { language: 'Italian', country_code: 'it' }, // Italy
    { language: 'Japanese', country_code: 'jp' }, // Japan
    /* {language: "Kannada", country_code: "in"}, // India */
    { language: 'Kazakh', country_code: 'kz' }, // Kazakhstan
    { language: 'Korean', country_code: 'kr' }, // South Korea
    { language: 'Latvian', country_code: 'lv' }, // Latvia
    { language: 'Lithuanian', country_code: 'lt' }, // Lithuania
    /* {language: "Macedonian", country_code: "mk"}, // North Macedonia */
    { language: 'Malay', country_code: 'my' }, // Malaysia
    /* {language: "Marathi", country_code: "in"}, // India */
    /* {language: "Maori", country_code: "nz"}, // New Zealand */
    /* {language: "Nepali", country_code: "np"}, // Nepal */
    { language: 'Norwegian', country_code: 'no' }, // Norway
    { language: 'Persian', country_code: 'ir' }, // Iran
    { language: 'Polish', country_code: 'pl' }, // Poland
    { language: 'Portuguese', country_code: 'pt' }, // Portugal
    { language: 'Romanian', country_code: 'ro' }, // Romania
    { language: 'Russian', country_code: 'ru' }, // Russia
    { language: 'Serbian', country_code: 'rs' }, // Serbia
    { language: 'Slovak', country_code: 'sk' }, // Slovakia
    { language: 'Slovenian', country_code: 'si' }, // Slovenia

    /* {language: "Swahili", country_code: "ke"}, // Kenya */
    { language: 'Swedish', country_code: 'se' }, // Sweden
    /* {language: "Tagalog", country_code: "ph"}, // Philippines */
    { language: 'Tamil', country_code: 'in' }, // India
    { language: 'Thai', country_code: 'th' }, // Thailand

    { language: 'Ukrainian', country_code: 'ua' }, // Ukraine
    /* {language: "Urdu", country_code: "pk"}, // Pakistan */
    /* {language: "Vietnamese", country_code: "vn"}, // Vietnam */
    /* {language: "Welsh", country_code: "gb"}, // United Kingdom */
  ]

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
        staggerChildren: 0.05
      }
    }
  };

  const flagAnimation = {
    hidden: { y: 20, opacity: 0 },
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
      id="languages"
      className="w-full pt-20 xl:pt-40 overflow-hidden pb-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-2xl xl:text-3xl text-slate-700 dark:text-zinc-200 quicksand font-bold mb-2"
          variants={fadeIn}
        >
          Supported Languages
        </motion.h2>
        <motion.p 
          className="text-md xl:text-lg mb-10 text-slate-600 dark:text-zinc-300 font-normal quicksand max-w-2xl"
          variants={fadeIn}
        >
          Transcribe, translate, and use generative AI with more than 40
          languages from around the world.
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          variants={staggerChildren}
        >
          {languages.map((language, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center justify-center"
              variants={flagAnimation}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="relative w-20 h-14 overflow-hidden rounded-md shadow-sm border border-slate-200 dark:border-zinc-700 hover:shadow-md transition-shadow duration-300">
                <Image
                  src={`https://flagcdn.com/w160/${language.country_code}.png`}
                  alt={`${language.language} flag`}
                  fill
                  sizes="(max-width: 768px) 80px, 100px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <p className="mt-2 text-center font-medium text-slate-700 dark:text-zinc-300 text-sm quicksand">
                {language.language}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
