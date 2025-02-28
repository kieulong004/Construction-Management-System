import CountPieChartComponent from "../../../components/chart/CountChartComponent";
import { useChartData } from "../../../components/data";
import CountPieTableComponent from "../../../components/table/CountTableComponent";
import "../../../style/workers.css";

const CountPage = () => {
  const { chart3 } = useChartData("","",[]);


  return (
    <div style={{ backgroundColor: chart3.darkMode ? "#393835" : "#f0f0f0" }}>
      <div className="chart-workers">
        <CountPieChartComponent
          title={chart3.title}
          data={chart3.data}
          legend={chart3.legend}
          tooltip={chart3.tooltip}
          darkMode={chart3.darkMode}
        />
        <CountPieTableComponent
          title={chart3.title}
          data={chart3.data}
          darkMode={chart3.darkMode}
        />
      </div>
    </div>
  );
};

export default CountPage;