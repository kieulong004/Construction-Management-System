import { useEffect } from 'react';
import * as echarts from 'echarts';

interface EventsChartComponentProps {
  data: { value: number, name: string }[];
  title: string;
  tooltip: string;
  legend: string;
  darkMode: boolean;
}

const EventsChartComponent: React.FC<EventsChartComponentProps> = ({ data, title, darkMode, tooltip, legend }) => {
  useEffect(() => {
    const textColor = darkMode ? '#fff' : '#000';
    const backgroundColor = darkMode ? "#393835" : "#f0f0f0";

    const chart = echarts.init(document.getElementById('pie-chart'));
    chart.setOption({
      backgroundColor: backgroundColor,
      title: { text: title, left: 'center', textStyle: { color: textColor, fontFamily: 'Arial, sans-serif' }},
      tooltip: { trigger: tooltip, backgroundColor: backgroundColor, textStyle: { color: textColor, fontFamily: 'Arial, sans-serif' }},
      legend: { bottom: legend, textStyle: { color: textColor, fontFamily: 'Arial, sans-serif' }},
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

  return <div id="pie-chart" style={{ width: "100%", height: "581px" }}></div>;
};

export default EventsChartComponent;