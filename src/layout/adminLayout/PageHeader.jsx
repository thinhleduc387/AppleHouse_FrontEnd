// components

// hooks
import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";

// utils
import dayjs from "dayjs";
import DocumentTitle from "../../component/admin/DocumentTitle";

const PageHeader = ({ title }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { width } = useWindowSize();
  const dateFormat = width < 768 ? "MM.DD.YYYY" : "MMMM DD, YYYY";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);

  return (
    <div className="bg-white shadow-sm">
      <DocumentTitle title={title} />
      <div className="px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          {title}
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center justify-center px-6 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center space-x-1 text-gray-700 font-medium">
              <span>{dayjs(currentTime).format(`${dateFormat} HH`)}</span>
              <span className="animate-pulse text-blue-500 font-bold">:</span>
              <span>{dayjs(currentTime).format("mm")}</span>
              <span className="text-gray-500 ml-1">
                {dayjs(currentTime).format("A")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
