type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};

export const TabButton = ({
  name,
  icon,
  setActiveTab,
  activeTab,
}: TabButtonProps) => {
  const isActive = activeTab === name;
  return (
    <button
      type="button"
      role="tab"
      className={`relative flex items-center gap-2 px-1 py-2 duration-200 text-gray-500 after:absolute after:-bottom-[0.563rem] after:left-0 after:h-[0.063rem] after:w-full after:transition-all after:duration-300 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${
        isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};
