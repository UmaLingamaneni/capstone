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
} from "chart.js";
import { Bar, Doughnut, Pie } from "react-chartjs-2";                  
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  getDefaultData,
  getNContentData,
} from "../../store/actions/dataAction";
import { Loader } from "../../component/loader";
import BarGraph from "../barGraph";
import { CardLoader } from "../cardLoader";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,ChartDataLabels
);

export default function GenderDistPieChart({ location, startDate, endDate,isChange }) {
  const { defData, loading } = useSelector((state) => state.data);
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: "Gender Data",
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
  console.log(defData);

  useEffect(() => {
    if (defData?.genderData?.data) {
      setBarData({
        labels:
          defData?.genderData?.data && defData?.genderData?.data?.length > 0
            ? defData?.genderData?.data[1]
                ?.map((item) => {
                  return item.Gender;
                })
            : [],
        datasets: [
          {
            label: "Gender Data",
            data:
              defData?.genderData?.data && defData?.genderData?.data?.length > 0
                ? defData?.genderData?.data[1]
                    ?.map((item) => {
                      return item.Count;
                    })
                : [],
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
  }, [defData]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getDefaultData(
        ` [dbo].[GetGenderDistribution]
        @StartDate = ${startDate ? `'${startDate}'` : null}, @EndDate = ${
          endDate ? `'${endDate}'` : null
        }, @Continent = ${
          location?.continent ? `'${location?.continent?.trim()}'` : null
        }, @Country = ${
          location?.country ? `'${location?.country?.trim()}'` : null
        }, @State_or_Province = ${
          location?.state ? `'${location?.state?.trim()}'` : null
        }, @Sub_region_1 = ${
          location?.region ? `'${location?.region?.trim()}'` : null
        }, @Sub_region_2 = ${
          location?.region2 ? `'${location?.region2?.trim()}'` : null
        };

        `,
        "genderData"
      )
    );
  }, [dispatch, isChange]);

  console.log();

  return (
    <div>
      <CardLoader loading={defData?.genderData?.loading} />

      {defData?.genderData?.data && (
        <Box
          sx={{
            height: "70vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Doughnut
           options={{
              responsive: true,
              // maintainAspectRatio: true,
              tooltips: {
                enabled: true,
              },
              plugins: {
                datalabels: {
                  formatter: (value, categories) => {
                    let sum = 0;
                    console.log(sum, categories);
                    let dataArr = categories.dataset.data;
                    dataArr.map((data) => {
                      sum += parseInt(data);
                    });
                    let percentage =
                      ((parseInt(value) * 100) / sum).toFixed(2) + "%";
                    return percentage;
                  },
                  color: "#fff",
                  fontWeight: "bold",
                },
              },
            }}
           data={barData} 
height={"100%"}

           />
        </Box>
      )}
    </div>
  );
}
