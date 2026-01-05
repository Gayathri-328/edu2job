import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function DegreeChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/charts/degree-role")
      .then(res => setData(res.data));
  }, []);

  const chartData = {
    labels: data.map(d => d.degree + " - " + d.role),
    datasets: [
      {
        label: "Students",
        data: data.map(d => d.count)
      }
    ]
  };

  return <Bar data={chartData} />;
}

export default DegreeChart;
