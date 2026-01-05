import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function BranchRoleChart({ data }) {
  const labels = data.map(item => `${item.branch} - ${item.role}`);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Job Role Count",
        data: data.map(() => 1),
      },
    ],
  };

  return <Bar data={chartData} />;
}

export default BranchRoleChart;
