import { useEffect } from 'react';
import * as echarts from 'echarts';

interface RateChartComponentProps {
  data: { value: number, name: string }[];
  title: string;
  tooltip: string;
  legend: string;
  darkMode: boolean;
}

const RateChartComponent: React.FC<RateChartComponentProps> = ({ data, title, darkMode, tooltip, legend }) => {
  useEffect(() => {
    const textColor = darkMode ? '#fff' : '#000';
    const backgroundColor = darkMode ? "#393835" : "#f0f0f0";

    const chart = echarts.init(document.getElementById('charts7'));
    chart.setOption({
      backgroundColor: backgroundColor,
      title: { text: title, left: 'center', textStyle: { color: textColor, fontFamily: 'Arial, sans-serif' }},
      tooltip: { trigger: tooltip, backgroundColor: backgroundColor, textStyle: { color: textColor, fontFamily: 'Arial, sans-serif' }},
      legend: { bottom: legend, textStyle: { color: textColor, fontFamily: 'Arial, sans-serif' }},
      color: ["#4caf50", "#f44336"],
      series: [{
        type: 'pie',
        data: data,
        label: { textStyle: { fontFamily: 'Arial, sans-serif' }}
      }]
    });

    window.addEventListener('resize', () => {
      chart.resize();
    });

    return () => {
      window.removeEventListener('resize', () => {
        chart.resize();
      });
    };
  }, [data, darkMode, title, tooltip,legend]);

  return <div id="charts7" style={{ width: '50%', height: '581px', }}></div>;
};

export default RateChartComponent;