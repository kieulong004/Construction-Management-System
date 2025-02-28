import { useState, useRef, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { format, startOfToday, addDays } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "../style/DateFilter.css";
import { toast } from "react-toastify";
import { getCameras } from "../components/service/camera";
import { ICamera } from "../components/common/type";

interface DataFilterProps {
  onFilter: (
    startDate: string,
    endDate: string,
    selectedIdCamera: number[]
  ) => void;
  darkMode: boolean;
}

const DataFilter: React.FC<DataFilterProps> = ({ onFilter, darkMode }) => {
  const [startDate, setStartDate] = useState<Date | null>(startOfToday());
  const [endDate, setEndDate] = useState<Date | null>(
    addDays(startOfToday(), 1)
  );
  const [openStartDate, setOpenStartDate] = useState<boolean>(false);
  const [openEndDate, setOpenEndDate] = useState<boolean>(false);
  const startDateRef = useRef<HTMLDivElement>(null);
  const endDateRef = useRef<HTMLDivElement>(null);
  const [cameraData, setCameraData] = useState<ICamera[]>([]);
  const [selectedIdCamera, setSelectedIdCamera] = useState<number[]>([]);
  const [isCameraDataLoaded, setIsCameraDataLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { i18n } = useTranslation();
  const locale = i18n.language === "vi" ? vi : enUS;

  const formatDate = (date: Date | null) =>
    date
      ? format(
          date,
          i18n.language === "vi" ? "dd/MM/yyyy HH:mm" : "MM/dd/yyyy hh:mm aa",
          { locale }
        )
      : "chọn ngày";

  const handleFilter = useCallback(() => {
    if (!startDate || !endDate) {
      toast.error("Vui lòng chọn ngày bắt đầu và kết thúc");
      return;
    }
    if (startDate && endDate && startDate > endDate) {
      toast.error("Ngày bắt đầu không thể lớn hơn ngày kết thúc");
      return;
    }
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      toast.error("Ngày không hợp lệ");
      return;
    }

    const formattedStartDate = format(startDate, "yyyy-MM-dd HH:mm:ss");
    const formattedEndDate = format(endDate, "yyyy-MM-dd HH:mm:ss");

    const cameraIdsToFilter =
      selectedIdCamera.length === 0
        ? cameraData.map((camera) => Number(camera.id))
        : selectedIdCamera;
    onFilter(formattedStartDate, formattedEndDate, cameraIdsToFilter);
  }, [startDate, endDate, selectedIdCamera, cameraData, onFilter]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        startDateRef.current &&
        !startDateRef.current.contains(event.target as Node)
      ) {
        setOpenStartDate(false);
      }
      if (
        endDateRef.current &&
        !endDateRef.current.contains(event.target as Node)
      ) {
        setOpenEndDate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCameraData = async () => {
      try {
        const response = await getCameras();
        setCameraData(response);
        setSelectedIdCamera([]);
        setIsCameraDataLoaded(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching camera data:", error);
        setIsLoading(false);
      }
    };

    if (!isCameraDataLoaded) {
      fetchCameraData();
    }
  }, [isCameraDataLoaded]);

  useEffect(() => {
    if (cameraData.length > 0) {
      const formattedStartDate = format(startOfToday(), "yyyy-MM-dd HH:mm:ss");
      const formattedEndDate = format(
        addDays(startOfToday(), 1),
        "yyyy-MM-dd HH:mm:ss"
      );
      const cameraIdsToFilter = cameraData.map((camera) => Number(camera.id));

      onFilter(formattedStartDate, formattedEndDate, cameraIdsToFilter);
    }
  }, [cameraData, onFilter]);

  const handleIdCamera = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) =>
      parseInt(option.value)
    );

    if (selectedOptions.includes(NaN)) {
      setSelectedIdCamera([]);
    } else {
      setSelectedIdCamera(selectedOptions);
    }
  };

  return (
    <div className="data-filter-container">
      <div className="data-back">
        <Link
          to={`/admin/dashboard`}
          className="filter-button"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0px 10px",
            boxSizing: "border-box",
          }}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="calendar-icon"
            style={{
              color: darkMode ? "#DDD" : "#fff",
              position: "relative",
              left: "3px",
              top: "0px",
            }}
          />
          <span style={{ padding: "8px", boxSizing: "border-box" }}>
            Quay lại
          </span>
        </Link>
      </div>

      <div>
        <div className="date-picker-container">
          <div className="camera-select-wrapper">
            <select
              className="camera-select"
              onChange={handleIdCamera}
              value={
                selectedIdCamera.length === 0
                  ? ""
                  : selectedIdCamera.map(String).join(",")
              }
            >
              <option value="">All</option>
              {cameraData &&
                cameraData.map((camera: ICamera, index: number) => (
                  <option key={index} value={camera.id.toString()}>
                    {camera.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="date-picker-wrapper" ref={startDateRef}>
            <div
              className="custom-datepicker"
              onClick={() => setOpenStartDate(true)}
            >
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="calendar-icon"
                style={{ color: darkMode ? "#DDD" : "#bd2d2d" }}
              />
              {formatDate(startDate)}
            </div>
            {openStartDate && (
              <div className="date-picker-dropdown">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => {
                    setStartDate(date);
                  }}
                  onSelect={() => setOpenStartDate(false)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  inline
                  dateFormat={
                    i18n.language === "vi"
                      ? "dd/MM/yyyy HH:mm"
                      : "MM/dd/yyyy hh:mm aa"
                  }
                  locale={locale}
                  className="date-picker"
                />
              </div>
            )}
          </div>

          <div className="date-picker-wrapper" ref={endDateRef}>
            <div
              className="custom-datepicker"
              onClick={() => setOpenEndDate(true)}
            >
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="calendar-icon"
                style={{ color: darkMode ? "#DDD" : "#bd2d2d" }}
              />
              {formatDate(endDate)}
            </div>
            {openEndDate && (
              <div className="date-picker-dropdown">
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => {
                    setEndDate(date);
                  }}
                  onSelect={() => setOpenEndDate(false)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  inline
                  dateFormat={
                    i18n.language === "vi"
                      ? "dd/MM/yyyy HH:mm"
                      : "MM/dd/yyyy hh:mm aa"
                  }
                  locale={locale}
                  className="date-picker"
                />
              </div>
            )}
          </div>
          <button onClick={handleFilter} className="filter-button">
            Filter
          </button>
        </div>
      </div>
      {isLoading && <div className="loading-indicator">Loading...</div>}
    </div>
  );
};

export default DataFilter;
