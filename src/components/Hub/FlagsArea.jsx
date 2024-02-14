import Image from 'next/image'
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

  return (
    <div
      id="languages"
      className="w-full  pt-20 xl:pt-40 overflow-hidden pb-10"
    >
      <p className="text-xl xl:text-2xl  pl-4 text-zinc-800 dark:text-zinc-300 font-averta-semibold">
        Supported Languages
      </p>
      <p className="text-md xl:text-lg mb-6  pt-4 pl-4 text-zinc-600 dark:text-zinc-300 font-normal">
        Transcribe, translate, and use generative AI with more than 40
        languages.
      </p>
      <div className="max-w-[800px] flex flex-wrap gap-6 mt-10">
        {languages.map(language => (
          <div className="flex flex-col items-center justify-center mx-auto w-[100px] grid grid-rows-3">
            <img
              className="row-span-2 rounded-md   object-cover w-16 h-10 mx-auto"
              src={`https://flagcdn.com/w80/${language.country_code}.png`}
              alt={languages.language}
            />

            <p className="row-span-1 text-center text-zinc-600 dark:text-zinc-400 text-md">
              {language.language}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
