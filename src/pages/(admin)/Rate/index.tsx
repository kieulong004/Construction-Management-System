import RateChartComponent from "../../../components/chart/RateChartComponent";
import { useChartData } from "../../../components/data";
import RateTableComponent from "../../../components/table/RateTableComponent";
const RatePage = () => {
  const { chart7 } = useChartData("","",[]);


  return (
    <div style={{ backgroundColor: chart7.darkMode ? "#393835" : "#f0f0f0" }}>
      <div className="chart-workers">
        <RateChartComponent
          title={chart7.title}
          tooltip={chart7.tooltip}
          legend={chart7.legend}
          data={chart7.data}
          darkMode={chart7.darkMode}
        />
        <RateTableComponent
          title={chart7.title}
          data={chart7.data}
          status={chart7.status}
          quantity={chart7.quantity}
          darkMode={chart7.darkMode}
        />
      </div>
    </div>
  );
};

export default RatePage;
