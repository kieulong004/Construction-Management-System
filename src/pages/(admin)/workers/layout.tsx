import ChartComponent from "../../../components/chart/WorkersChartComponent";
import { useChartData } from "../../../components/data";
import WorkersTableComponent from "../../../components/table/WorkersTableComponent";
import "../../../style/workers.css";

const WorkersPage = () => {
  const { chart1 } = useChartData("","",[]);

  return (
    <div style={{ backgroundColor: chart1.darkMode ? "#393835" : "#f0f0f0" }}>
      <div className="chart-workers">
        <ChartComponent
          title={chart1.title}
          seriesData={chart1.seriesData}
          xAxisData={chart1.xAxisData}
          tooltip={chart1.tooltip}
          legend={chart1.legend}
          darkMode={chart1.darkMode}
        />
        <WorkersTableComponent
          title={chart1.title}
          seriesData={chart1.seriesData}
          xAxisData={chart1.xAxisData}
          darkMode={chart1.darkMode}
          day={chart1.day}
        />
      </div>
    </div>
  );
};

export default WorkersPage;
