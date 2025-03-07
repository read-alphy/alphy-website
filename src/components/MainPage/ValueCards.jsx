import React from 'react';

// Enhanced feature card data with additional properties
const featureData = {
  features: [
    {
      icon: "/educationIcons/Medal.svg",
      accentColor: "#F59E0B", // Amber
      title: "Transcribe with High Accuracy",
      description: "Turn any audio to text with industry-leading accuracy and the best transcription models on the market",
      stat: "98% accuracy rate"
    },
    {
      icon: "/educationIcons/Books.svg",
      accentColor: "#3B82F6", // Blue
      title: "Upload Meetings, Lectures, or Any Recording",
      description: "Use Alphy to get the most out of your recordings. Transcribe, summarize, and turn them into brand new content",
      stat: "Up to 10 hours per file"
    },
    {
      icon: "/educationIcons/Video.svg",
      accentColor: "#EC4899", // Pink
      title: "Use it on YouTube, X Spaces, and Podcasts",
      description: "Turn the greatest online discussions to text and use Alphy to create new engaging material",
      stat: "10K+ videos processed"
    },
    {
      icon: "/educationIcons/Textbook.svg",
      accentColor: "#10B981", // Emerald
      title: "Multiple Export Options (TXT and SRT)",
      description: "Download transcripts as plain text or subtitles ready to use in videos",
      stat: "Flexible file formats"
    },
    {
      icon: "/educationIcons/Globus.svg",
      accentColor: "#6366F1", // Indigo
      title: "Break Down Language Barriers",
      description: "Submit content in over 40 languages and translate the output to any language you want",
      stat: "40+ supported languages"
    },
    {
      icon: "/educationIcons/Physics.svg",
      accentColor: "#8B5CF6", // Violet
      title: "One Click Submission and Fast Processing",
      description: "Simply give a link or upload a file, and your file will be ready in matter of minutes",
      stat: "3-5 minute processing"
    }
  ],
  productivity: [
    {
      icon: "/educationIcons/AlarmClock.svg",
      accentColor: "#EF4444", // Red
      title: "Save 95% Time with Powerful Summaries",
      description: "Read the key takeaways or chapterized summaries to distill essential information and get rid of the clutter",
      stat: "1-hour lecture → 3-min read"
    },
    {
      icon: "/educationIcons/Communication.svg",
      accentColor: "#F59E0B", // Amber
      title: "Get Accurate Answers with Precise Timestamps",
      description: "Go through Alphy's curated questions or ask new ones to get AI-generated answers with timestamped sources",
      stat: "Instant contextual answers"
    },
    {
      icon: "/educationIcons/StudentCard.svg",
      accentColor: "#3B82F6", // Blue
      title: "Build Custom AI Agents on Audio",
      description: "Combine your uploads and online content and create a powerful AI agent ready to answer all your questions from the audio content you specify.",
      stat: "Unlimited knowledge base"
    }
  ],
  creators: [
    {
      icon: "/educationIcons/Pendilum.svg",
      accentColor: "#10B981", // Emerald
      title: "Turn Discussions to New Content",
      description: "Use Alphy's Playground to turn conversations to Twitter threads, blog posts, newsletters, or any other easily accessible engaging content",
      stat: "10+ content formats"
    },
    {
      icon: "/educationIcons/Presentation.svg",
      accentColor: "#6366F1", // Indigo
      title: "Educational Material",
      description: "Use Alphy to create interactive quizzes, actionable insights, and comprehensive learning materials.",
      stat: "Perfect for educators"
    },
    {
      icon: "/educationIcons/Rating.svg",
      accentColor: "#8B5CF6", // Violet
      title: "SEO & Copywriting & Research",
      description: "Extract critical keywords from popular YouTube videos, ideate fresh video concepts or clips, and craft compelling narratives",
      stat: "Boost content performance"
    }
  ]
};

export default function EnhancedValueCards() {
  // Custom SVG icons for visual enhancement (fallbacks for missing images)
  const iconPlaceholders = {
    Medal: (color) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </svg>
    ),
    Books: (color) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    )
  };

  // Utility function to render a feature icon with fallback
  const renderIcon = (iconPath, title, accentColor) => {
    // Extract icon name from path for fallback
    const iconName = iconPath.split('/').pop().replace('.svg', '');
    
    return (
      <div className="relative">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center" 
          style={{ backgroundColor: `${accentColor}15` }} // Using hex with 15% opacity
        >
          <img 
            src={iconPath} 
            alt={title}
            width={40} 
            height={40} 
            className="object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="hidden">
            {iconPlaceholders[iconName] ? 
              iconPlaceholders[iconName](accentColor) : 
              <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: accentColor }}>
                <span className="text-white font-bold">{iconName.charAt(0)}</span>
              </div>
            }
          </div>
        </div>
        <div 
          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center" 
          style={{ backgroundColor: accentColor }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    );
  };

  /**
   * Modern FeatureCard component with enhanced visual design
   */
  const FeatureCard = ({ icon, title, description, stat, accentColor }) => {
    return (
      <div className="rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700
                    p-4 sm:p-6 transition-all duration-300 ease-in-out h-full flex flex-col
                    relative overflow-hidden group">
        {/* Accent color top border */}
        <div 
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: accentColor }}
        ></div>
        
        {/* Content */}
        <div className="flex flex-col gap-4">
          {/* Icon and title/description in mobile layout */}
          <div className="flex items-start gap-3 sm:gap-5">
            {/* Icon */}
            <div className="flex-shrink-0">
              {renderIcon(icon, title, accentColor)}
            </div>
            
            <div className="flex-1">
              {/* Stat badge */}
              {stat && (
                <div 
                  className="text-xs font-medium py-1 px-2 rounded-full inline-block mb-2"
                  style={{ 
                    backgroundColor: `${accentColor}15`, 
                    color: accentColor 
                  }}
                >
                  {stat}
                </div>
              )}
              
              <h3 className="text-lg sm:text-xl font-bold quicksand text-slate-800 dark:text-zinc-100 mb-1 sm:mb-2 leading-tight">
                {title}
              </h3>
              
              <p className="text-sm sm:text-md text-slate-600 dark:text-zinc-300 quicksand">
                {description}
              </p>
            </div>
          </div>
        </div>
        
        {/* 
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-zinc-700 flex justify-end">
          <button 
            className="text-sm font-medium flex items-center"
            style={{ color: accentColor }}
          >
            Learn more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div> */}
      </div>
    );
  };

  /**
   * Enhanced section with visual improvements
   */
  const FeatureSection = ({ title, description, cards }) => (
    <section className="mt-20 md:mt-32 relative">
      {/* Section header with description */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-zinc-100 quicksand">
          {title}
        </h2>
        {description && (
          <p className="text-lg text-slate-600 dark:text-zinc-300">
            {description}
          </p>
        )}
      </div>
      
      {/* Visual accent elements */}
      <div className="absolute top-10 right-0 w-40 h-40 bg-blue-50 dark:bg-blue-900/20 rounded-full -z-10 blur-3xl opacity-70"></div>
      <div className="absolute bottom-10 left-0 w-64 h-64 bg-purple-50 dark:bg-purple-900/20 rounded-full -z-10 blur-3xl opacity-50"></div>
      
      {/* Cards grid with responsive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <FeatureCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            stat={card.stat}
            accentColor={card.accentColor}
          />
        ))}
      </div>
    </section>
  );

  /**
   * Section divider with icon and call-to-action
   */
  const SectionDivider = ({ icon, title, buttonText }) => (
    <div className="my-20 py-10 px-8 bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-900/30 dark:to-indigo-900/30 rounded-2xl flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-6 md:mb-0">
        <div className="bg-white dark:bg-zinc-800 p-3 rounded-xl shadow-md mr-4">
          <img src={icon} alt="" width={32} height={32} className="object-contain" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-zinc-100">
          {title}
        </h3>
      </div>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200 shadow-md hover:shadow-none">
        {buttonText}
      </button>
    </div>
  );

  return (
    <div className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-50 dark:bg-blue-900/10 rounded-full -z-10 blur-3xl opacity-60"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-purple-50 dark:bg-purple-900/10 rounded-full -z-10 blur-3xl opacity-50"></div>
      
      {/* Features Section */}
      <FeatureSection 
        title="Powerful Features" 
        description="Transform your audio content into valuable, accessible information with our industry-leading tools."
        cards={featureData.features} 
      />
      
     {/* 
      <div className="my-20 p-8 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700">
        <div className="flex items-start">
          <div className="text-5xl text-slate-300 dark:text-zinc-600 mr-4">"</div>
          <div>
            <p className="text-lg text-slate-700 dark:text-zinc-200 italic">
              Alphy has transformed how I process lecture recordings. I used to spend hours reviewing content, but now I can get comprehensive summaries in minutes and focus on actual learning.
            </p>
            <div className="mt-4 flex items-center">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mr-3">
                <span className="text-indigo-600 dark:text-indigo-300 font-medium">JD</span>
              </div>
              <div>
                <div className="font-medium text-slate-800 dark:text-zinc-100">Jamie Davis</div>
                <div className="text-sm text-slate-500 dark:text-zinc-400">PhD Student, MIT</div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      
      {/* Productivity Section */}
      <FeatureSection 
        title="Boost Your Productivity" 
        description="Extract more value from your time with tools designed to accelerate learning and information processing."
        cards={featureData.productivity} 
      />
      
      {/* Product showcase */}
      {/* <div className="my-20 p-1 bg-gradient-to-r from-sky-400 to-indigo-600 rounded-2xl shadow-none">
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-100 mb-4">
              See It in Action
            </h3>
            <p className="text-slate-600 dark:text-zinc-300 mb-6">
              Watch how Alphy transforms a 2-hour X Space into a comprehensive summary with key insights, timestamps, and ready-to-share content.
            </p>
            <button className="bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch Demo
            </button>
          </div>
          <div className="md:w-1/2 bg-slate-100 dark:bg-zinc-800 rounded-lg p-3 shadow-inner">
            <div className="aspect-video bg-slate-200 dark:bg-zinc-700 rounded relative overflow-hidden">
              
              <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400 dark:text-zinc-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      
      {/* Section divider/CTA */}
      <SectionDivider 
        icon="/educationIcons/StudentCard.svg" 
        title="Want to create your own AI knowledge base from audio?" 
        buttonText="Try Alphy Premium" 
      />
      
      {/* Creators Section */}
      <FeatureSection 
        title="Empowering Content Creators" 
        description="Transform existing audio into multiple content formats to reach wider audiences and save production time."
        cards={featureData.creators} 
      />
      
      {/* Final CTA */}
      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-zinc-100 mb-6">
          Ready to transform your audio content?
        </h2>
        <button className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white px-6 py-2 rounded-xl font-medium text-md shadow-none hover:shadow-none transition duration-200">
          Get Started for Free
        </button>
        <p className="mt-4 text-slate-500 dark:text-zinc-400">
          No credit card required. Free plan includes 5 hours of processing per month.
        </p>
      </div>
    </div>
  );
}