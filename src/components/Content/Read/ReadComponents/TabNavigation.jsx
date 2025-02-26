const TabNavigation = ({ activeTab, setActiveTab }) => {
    return (
      <div className="text-sm font-medium text-center text-slate-700 dark:text-slate-200 dark:border-gray-700">
        <ul className="flex flex-wrap xl:w-[450px] w-full mx-auto quicksand font-bold">
          <li
            className={`w-1/3 md:w-4/12 ${
              activeTab === 'tab3'
                ? 'text-slate-700 dark:bg-mildDarkMode dark:text-slate-300 border-b-2 quicksand font-bold border-greenColor'
                : 'quicksand font-bold border-b border-gray-200'
            }`}
          >
            <button
              onClick={() => setActiveTab('tab3')}
              className="text-l p-4 pt-6 rounded-t-lg dark:text-slate-200 dark:border-greenColor"
            >
              Key Takeaways
            </button>
          </li>
          <li
            className={`w-1/3 md:w-4/12 ${
              activeTab === 'tab1'
                ? 'text-slate-700 dark:bg-mildDarkMode dark:text-slate-300 border-b-2 quicksand font-bold border-greenColor'
                : 'quicksand font-bold border-b border-gray-200'
            }`}
          >
            <button
              onClick={() => setActiveTab('tab1')}
              className="text-l inline-block p-4 pt-6 rounded-t-lg dark:text-slate-200 dark:border-greenColor"
            >
              Summary
            </button>
          </li>
          <li
            className={`w-1/3 md:w-4/12 ${
              activeTab === 'tab2'
                ? 'text-slate-700 dark:bg-mildDarkMode dark:text-slate-300 border-b-2 quicksand font-bold border-greenColor'
                : 'quicksand font-bold border-b border-gray-200'
            }`}
          >
            <button
              onClick={() => setActiveTab('tab2')}
              className="text-l inline-block p-4 pt-6 rounded-t-lg dark:text-slate-200 dark:border-greenColor"
            >
              Transcript
            </button>
          </li>
        </ul>
      </div>
    );
  };
  
  export default TabNavigation;