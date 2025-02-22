import { motion } from "framer-motion";

interface ViewSwitchProps {
  view: "list" | "table";
  setView: (view: "list" | "table") => void;
}

const ViewSwitch: React.FC<ViewSwitchProps> = ({ view, setView }) => {
  return (
    <div className="relative flex w-32 p-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-2">
      <motion.div
        className="absolute w-14 h-7 bg-white rounded-full shadow-md"
        animate={{ x: view === "table" ? 55 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
      <button
        className={`relative w-1/2 text-sm font-semibold py-1 rounded-full z-10 ${
          view === "list" ? "text-gray-800" : "text-gray-500"
        }`}
        onClick={() => setView("list")}
      >
        List
      </button>
      <button
        className={`relative w-1/2 text-sm font-semibold py-1 rounded-full z-10 ${
          view === "table" ? "text-gray-800" : "text-gray-500"
        }`}
        onClick={() => setView("table")}
      >
        Table
      </button>
    </div>
  );
};

export default ViewSwitch;