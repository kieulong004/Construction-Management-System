import SiteChartComponent from "../../../components/chart/SiteChartComponent";
import { useChartData } from "../../../components/data";
import SiteTableComponent from "../../../components/table/SiteTableComponent";
import "../../../style/workers.css";

const SitePage = () => {
  const { chart8 } = useChartData("","",[]);

  return (
    <div style={{ backgroundColor: chart8.darkMode ? "#393835" : "#f0f0f0" }}>
      <div className="chart-workers">
        <SiteChartComponent
          title={chart8.title}
          tooltip={chart8.tooltip}
          legend={chart8.legend}
          seriesData={chart8.SeriesData}
          xAxisData={chart8.xAxisData}
          name={chart8.name}
          quantity={chart8.quantity}
          darkMode={chart8.darkMode}
        />
        <SiteTableComponent
          title={chart8.title}
          seriesData={chart8.SeriesData}
          xAxisData={chart8.xAxisData}
          name={chart8.name}
          darkMode={chart8.darkMode}
        />
      </div>
    </div>
  );
};

export default SitePage;
