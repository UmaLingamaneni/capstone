import React, { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { CardLoader } from "./cardLoader";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function BarGraph({ defData, barData, loading }) {
  console.log(loading);

  return (
    <div>
      <CardLoader loading={loading} />

      {defData && (
        <Box
          sx={{
            height: "70vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Bar
            data={barData}
            options={{
              plugins: {
                datalabels: {
                  color: "rgba(0,0,0,0)",
                },
              },

              maintainAspectRatio: false,
              datalabels: {
                display: false,
                align: "bottom",
                borderRadius: 3,
                font: {
                  size: 18,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: "Count",
                  },
                },
                y: {
                  grid: {
                    display: false,
                  },
                },
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Count",
                    },
                  },
                ],
              },
            }}
          />
        </Box>
      )}
    </div>
  );
}
