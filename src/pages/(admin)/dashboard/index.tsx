import Dashboard from "../../../components/Dashboard";
import Charts from "../../../components/echarts";
import Section2 from "../../../components/Sestion2";
import TopTabs from "../../../components/TopTaps";
import "../../../style/index.css"


const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <section id="section1">
        <TopTabs />
        <Dashboard />
        <Charts />
      </section>
      <Section2 />
    </div>
  );
};

export default DashboardPage;
