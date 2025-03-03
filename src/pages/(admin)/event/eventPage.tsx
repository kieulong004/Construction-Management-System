import EventsPieChartComponent from "../../../components/chart/EventsChartComponent";
import { useChartData } from "../../../components/data";
import EventTableComponent from "../../../components/table/EventTableComponent";

const EventPage = () => {
  const { event } = useChartData("","",[]);



  return (
<div style={{ backgroundColor: event.darkMode ? "#393835" : "#f0f0f0" }}>
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
