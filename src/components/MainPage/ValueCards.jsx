import React from 'react';
import Link from 'next/link';

const archiveCards = [
  {
    icon: "/educationIcons/Textbook.svg",
    accentColor: "#3B82F6",
    title: "Existing Sources Stay Readable",
    description: "Previously processed source pages remain online with transcripts, summaries, timestamps, and related reading material.",
    stat: "Read-only access"
  },
  {
    icon: "/educationIcons/Globus.svg",
    accentColor: "#10B981",
    title: "Public Archive Remains Browsable",
    description: "Visitors can continue exploring public material that was already available in Alphy before the wind-down.",
    stat: "Browse existing content"
  },
  {
    icon: "/educationIcons/StudentCard.svg",
    accentColor: "#F59E0B",
    title: "Existing Accounts Are Preserved",
    description: "Signed-in users can keep reading their previously processed materials, but new purchases and processing jobs are disabled.",
    stat: "No new subscriptions"
  }
];

const closedItems = [
  "New subscriptions and credit purchases",
  "New uploads, links, and source processing",
  "Q&A, Playground, Arcs, and other AI interactions"
];

export default function EnhancedValueCards() {
  const renderIcon = (iconPath, title, accentColor) => (
    <div className="relative">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: `${accentColor}15` }}
      >
        <img
          src={iconPath}
          alt={title}
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
      <div
        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
        style={{ backgroundColor: accentColor }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="relative overflow-hidden">
      <section className="mt-20 md:mt-32 relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400 mb-3">
            Archive status
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-zinc-100 quicksand">
            What remains available
          </h2>
          <p className="text-lg text-slate-600 dark:text-zinc-300">
            Alphy is being wound down as an active product. The site remains online
            so existing users can continue reading material that has already been
            processed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {archiveCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 p-4 sm:p-6 h-full flex flex-col relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: card.accentColor }}
              ></div>

              <div className="flex items-start gap-3 sm:gap-5">
                <div className="flex-shrink-0">
                  {renderIcon(card.icon, card.title, card.accentColor)}
                </div>

                <div className="flex-1">
                  <div
                    className="text-xs font-medium py-1 px-2 rounded-full inline-block mb-2"
                    style={{
                      backgroundColor: `${card.accentColor}15`,
                      color: card.accentColor
                    }}
                  >
                    {card.stat}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold quicksand text-slate-800 dark:text-zinc-100 mb-1 sm:mb-2 leading-tight">
                    {card.title}
                  </h3>

                  <p className="text-sm sm:text-md text-slate-600 dark:text-zinc-300 quicksand">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 md:mt-32 grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-10 items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-zinc-400 mb-3">
            Closed features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-zinc-100 quicksand">
            Alphy no longer accepts new activity.
          </h2>
          <p className="text-lg text-slate-600 dark:text-zinc-300">
            We have stopped new subscriptions and retired the parts of the product
            that created new AI output. The goal now is preservation, not expansion.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6">
          <ul className="space-y-4">
            {closedItems.map((item) => (
              <li key={item} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700 dark:text-zinc-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-zinc-100 mb-6">
          Browse the existing archive
        </h2>
        <Link
          href="/explore"
          className="inline-flex bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white px-6 py-2 rounded-xl font-medium text-md shadow-none hover:shadow-none transition duration-200"
        >
          Explore Existing Material
        </Link>
        <p className="mt-4 text-slate-500 dark:text-zinc-400">
          New subscriptions and new content processing are closed.
        </p>
      </div>
    </div>
  );
}
