// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// function EducationBar() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/charts/branch-vs-role")
//       .then(res => {
//         const map = {};

//         res.data.forEach(item => {
//           const branch = item.branch.toUpperCase(); // 🔥 FIX
//           map[branch] = (map[branch] || 0) + 1;
//         });

//         const formatted = Object.keys(map).map(branch => ({
//           branch,
//           count: map[branch]
//         }));

//         setData(formatted);
//       });
//   }, []);

//   return (
//     <div style={{ height: 300 }}>
//       <h3>Education vs Job Predictions</h3>
//       <ResponsiveContainer>
//         <BarChart data={data}>
//           <XAxis dataKey="branch" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="count" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default EducationBar;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
// } from "recharts";

// const COLORS = ["#6366F1", "#22C55E", "#F97316", "#EF4444", "#14B8A6"];

// function EducationBar() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/charts/branch-vs-role")
//       .then((res) => {
//         const map = {};

//         res.data.forEach((item) => {
//           const branch = item.branch.toUpperCase();
//           map[branch] = (map[branch] || 0) + 1;
//         });

//         const formatted = Object.keys(map).map((branch) => ({
//           branch,
//           count: map[branch],
//         }));

//         setData(formatted);
//       });
//   }, []);

//   return (
//     <div style={{ height: 320 }}>
//       <h3 style={{ textAlign: "center" }}>Education vs Job Predictions</h3>

//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={data}>
//           <XAxis dataKey="branch" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="count">
//             {data.map((_, index) => (
//               <Cell
//                 key={index}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// export default EducationBar;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const COLORS = ["#4f46e5", "#16a34a", "#f59e0b", "#dc2626", "#0ea5e9"];

function EducationBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/charts/branch-vs-role")
      .then(res => {
        const map = {};

        res.data.forEach(item => {
          const branch =
            (item.branch || item.degree || "UNKNOWN").toUpperCase();

          map[branch] = (map[branch] || 0) + 1;
        });

        const formatted = Object.keys(map).map(branch => ({
          branch,
          count: map[branch]
        }));

        setData(formatted);
      });
  }, []);

  return (
    <div style={{ height: 320 }}>
      <h3>Education vs Job Predictions</h3>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="branch" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count">
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EducationBar;
