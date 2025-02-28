import ProgressChartComponent from "../../../components/chart/ProgressChartComponent";
import { useChartData } from "../../../components/data";
import ProgressTableComponent from "../../../components/table/ProgressTableComponent";
const ProgressPage = () => {
  const { chart2 } = useChartData("","",[]);

  return (
    <div style={{ backgroundColor: chart2.darkMode ? "#393835" : "#f0f0f0" }}>
      <div className="chart-workers">
        <ProgressChartComponent
          title={chart2.title}
          xAxisData={chart2.xAxisData}
          seriesData={chart2.seriesData}
          tooltip={chart2.tooltip}
          legend={chart2.legend}
          darkMode={chart2.darkMode}
          contractor={chart2.contractor}
        />
        <ProgressTableComponent
          title={chart2.title}
          xAxisData={chart2.xAxisData}
          seriesData={chart2.seriesData}
          darkMode={chart2.darkMode}
          contractor={chart2.contractor}
        />
      </div>
    </div>
  );
};

export default ProgressPage;
