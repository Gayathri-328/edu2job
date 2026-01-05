import { Pie } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function DomainChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/charts/domain")
      .then(res => setData(res.data));
  }, []);

  const chartData = {
    labels: data.map(d => d.domain),
    datasets: [
      {
        data: data.map(d => d.count)
      }
    ]
  };

  return <Pie data={chartData} />;
}

export default DomainChart;
