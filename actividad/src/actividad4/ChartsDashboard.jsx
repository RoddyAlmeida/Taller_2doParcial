import React, { useState, useEffect, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './ChartsDashboard.css';

const initialStudentData = [
  { name: "Carla", y: 135 },
  { name: "Marc", y: 89 },
  { name: "Victor", y: 44 },
  { name: "Rafa", y: 32 },
  { name: "Fabrizio", y: 12 }
];

const monthlyData = [
  { name: "Enero", y: 65 },
  { name: "Febrero", y: 78 },
  { name: "Marzo", y: 92 },
  { name: "Abril", y: 85 },
  { name: "Mayo", y: 110 },
  { name: "Junio", y: 125 }
];

export default function ChartsDashboard() {
  const [activeChart, setActiveChart] = useState('pie');
  const [randomData, setRandomData] = useState([]);

  useEffect(() => {
    // Generar datos aleatorios para el gráfico en tiempo real
    const interval = setInterval(() => {
      setRandomData(prev => {
        const newPoint = Math.floor(Math.random() * 100);
        return [...prev, newPoint].slice(-10);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pieChartOptions = useMemo(() => ({
    chart: {
      type: 'pie',
      backgroundColor: 'transparent'
    },
    title: {
      text: 'Distribución de Estudiantes'
    },
    accessibility: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Estudiantes',
      colorByPoint: true,
      data: initialStudentData
    }]
  }), []);

  const columnChartOptions = useMemo(() => ({
    chart: {
      type: 'column',
      backgroundColor: 'transparent'
    },
    title: {
      text: 'Progreso Mensual'
    },
    accessibility: {
      enabled: false
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Valor'
      }
    },
    series: [{
      name: 'Progreso',
      data: monthlyData,
      colorByPoint: true
    }]
  }), []);

  const liveChartOptions = useMemo(() => ({
    chart: {
      type: 'line',
      backgroundColor: 'transparent',
      animation: {
        duration: 500
      }
    },
    title: {
      text: 'Datos en Tiempo Real'
    },
    accessibility: {
      enabled: false
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Valor'
      }
    },
    series: [{
      name: 'Datos',
      data: randomData
    }]
  }), [randomData]);

  const renderChart = (type) => {
    switch(type) {
      case 'pie':
        return <HighchartsReact 
          highcharts={Highcharts} 
          options={pieChartOptions}
          containerProps={{ style: { height: '400px' } }}
        />;
      case 'column':
        return <HighchartsReact 
          highcharts={Highcharts} 
          options={columnChartOptions}
          containerProps={{ style: { height: '400px' } }}
        />;
      case 'live':
        return <HighchartsReact 
          highcharts={Highcharts} 
          options={liveChartOptions}
          containerProps={{ style: { height: '400px' } }}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="charts-dashboard">
      <div className="chart-controls">
        <button 
          className={`chart-button ${activeChart === 'pie' ? 'active' : ''}`}
          onClick={() => setActiveChart('pie')}
        >
          Gráfico Circular
        </button>
        <button 
          className={`chart-button ${activeChart === 'column' ? 'active' : ''}`}
          onClick={() => setActiveChart('column')}
        >
          Gráfico de Columnas
        </button>
        <button 
          className={`chart-button ${activeChart === 'live' ? 'active' : ''}`}
          onClick={() => setActiveChart('live')}
        >
          Datos en Tiempo Real
        </button>
      </div>

      <div className="chart-container">
        {renderChart(activeChart)}
      </div>
    </div>
  );
} 