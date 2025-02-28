import { useState } from "react";
import EventsPieChartComponent from "../../../components/chart/EventsChartComponent";
import { useChartData } from "../../../components/data";
import EventTableComponent from "../../../components/table/EventTableComponent";
import DataFilter from "../../../date";

const EventPage = () => {
  const { event } = useChartData();
  const setFilteredEvents = useState<{ _id: string; name: string; country: string; createdAt: string; }[]>([])[1];

    const handleFilter = (startDate: Date, endDate: Date) => {
      const events = [
        {
          _id: "67475131abe5076d670a72aa",
          name: "sand",
          country: "Hà Nội",
          createdAt: "2024-11-27T17:04:50.015+00:00",
        },
        {
          _id: "67475131abe5076d670a72bb",
          name: "rock",
          country: "Đà Nẵng",
          createdAt: "2024-12-01T08:30:00.015+00:00",
        },
      ];
    
      const startTimestamp = startDate.getTime(); 
      const endTimestamp = endDate.getTime();
    
      const filtered = events.filter((event) => {
        const eventCreatedAt = new Date(event.createdAt).getTime();
    
        return eventCreatedAt >= startTimestamp && eventCreatedAt <= endTimestamp
        
      });

    setFilteredEvents(filtered);
  };

  return (
<div style={{ backgroundColor: event.darkMode ? "#393835" : "#f0f0f0" }}>
      <DataFilter onFilter={handleFilter} darkMode={event.darkMode} />
      <div className="chart-workers">

      <EventsPieChartComponent
        data={event.data}
        title={event.title}
        tooltip={event.tooltip}
        legend={event.legend}
        darkMode={event.darkMode}
      />
      <EventTableComponent
        title={event.title}
        data={event.data}
        darkMode={event.darkMode}
      />
    </div>
    </div>
  );
};

export default EventPage;
