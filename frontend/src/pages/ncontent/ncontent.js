import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import NavBar from "../../component/navbar";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartDataLabels,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getData, getNContentData } from "../../store/actions/dataAction";
import { Loader } from "../../component/loader";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function N_Content() {
  const { nData, loading } = useSelector((state) => state.data);
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: "Covid Cases Coverage Data",
        data: [],
        backgroundColor: [
          "#33b2df",
          "#546E7A",
          "#d4526e",
          "#13d8aa",
          "#A5978B",
          "#2b908f",
          "#f9a3a4",
          "#90ee7e",
          "#f48024",
          "#69d2e7",
        ],
        borderColor: [
          "#33b2df",
          "#546E7A",
          "#d4526e",
          "#13d8aa",
          "#A5978B",
          "#2b908f",
          "#f9a3a4",
          "#90ee7e",
          "#f48024",
          "#69d2e7",
        ],
        borderWidth: 1,
      },
    ],
  });
  console.log(nData);

  useEffect(() => {
    if (nData?.counts) {
      setBarData({
        labels: [
          "High Coverage Data",
          "Low Coverage Data",
          "Total Coverage Data",
        ],
        datasets: [
          {
            label: "Covid Cases Coverage Data",
            data: nData?.counts[0]?.map((item) => {
              return item?.Count;
            }),
            backgroundColor: [
              "#33b2df",
              "#546E7A",
              "#d4526e",
              "#13d8aa",
              "#A5978B",
              "#2b908f",
              "#f9a3a4",
              "#90ee7e",
              "#f48024",
              "#69d2e7",
            ],
            borderColor: [
              "#33b2df",
              "#546E7A",
              "#d4526e",
              "#13d8aa",
              "#A5978B",
              "#2b908f",
              "#f9a3a4",
              "#90ee7e",
              "#f48024",
              "#69d2e7",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [nData]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNContentData());
  }, []);

  return (
    <div>
      <Loader loading={loading} />
      <Typography variant="h5" textAlign="center" sx={{ mt: 3 }}>
        The Maximum Low Coverage Data Is{" "}
        {nData?.lowCovergeMin &&
          nData?.lowCovergeMin[0]?.MaxNContentwithLowCoverage}
      </Typography>

      {nData?.counts && (
        <Box
          sx={{
            height: "70vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Card
            sx={{
              p: 3,
              height: "70vh",
              width: "100%",

              borderRadius: "20px",
              boxShadow: "5px 5px 2px #aaaaaa",
            }}
          >
            <Bar
              data={barData}
              options={{
                maintainAspectRatio: false,
                datalabels: {
                  display: true,
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
                  },
                  y: {
                    grid: {
                      display: false,
                    },
                  },
                },
                plugins: {
                  datalabels: {
                    color: "rgba(255,255,255,0)",
                  },
                },
              }}
            />
          </Card>
        </Box>
      )}
    </div>
  );
}
