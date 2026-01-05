// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

// function JobPredictionPie() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/charts/domain-distribution")
//       .then(res => {
//         const formatted = Object.keys(res.data).map(key => ({
//           name: key,
//           value: res.data[key]
//         }));
//         setData(formatted);
//       });
//   }, []);

//   return (
//     <div style={{ height: 300 }}>
//       <h3>Job Prediction Distribution</h3>
//       <ResponsiveContainer>
//         <PieChart>
//           <Pie data={data} dataKey="value" nameKey="name" />
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default JobPredictionPie;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#f97316",
  "#ef4444",
  "#0ea5e9",
  "#a855f7",
];

function JobPredictionPie() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/charts/domain-distribution")
      .then((res) => {
        const formatted = Object.keys(res.data).map((key) => ({
          name: key,
          value: res.data[key],
        }));
        setData(formatted);
      });
  }, []);

  return (
    <div style={{ height: 320 }}>
      <h3>Job Prediction Distribution</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default JobPredictionPie;
