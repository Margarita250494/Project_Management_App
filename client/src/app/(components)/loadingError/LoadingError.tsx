import { motion } from "framer-motion";

type LoadingErrorProps = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

export const LoadingError = ({
  isLoading,
  isError,
  errorMessage,
}: LoadingErrorProps) => {
  if (isLoading)
    return (
      <motion.span
        className="text-sm font-semibold text-gray-500"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading...
      </motion.span>
    );

  if (isError)
    return (
      <motion.p
        className="mt-2 text-sm font-semibold text-red-600"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          x: [0, -3, 3, -3, 3, 0],
          transition: { duration: 0.4 },
        }}
      >
        ❌ {errorMessage}
      </motion.p>
    );

  return null;
};
