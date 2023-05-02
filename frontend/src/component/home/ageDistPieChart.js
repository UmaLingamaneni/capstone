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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  getDefaultData,
  getNContentData,
} from "../../store/actions/dataAction";
import CanvasJSReact from "../../chartcanvas/canvasjs.react";
import { CardLoader } from "../cardLoader";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartDataLabels
);

export default function AgeDistPieChart({ location, startDate, endDate ,isChange}) {
  const { defData, loading } = useSelector((state) => state.data);
  const [barData, setBarData] = useState({
    animationEnabled: true,
    title: {
      text: "Age Distribution",
    },
    subtitles: [
      {
        verticalAlign: "center",
        fontSize: 24,
        dockInsidePlotArea: true,
      },
    ],
    data: [
      {
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        dataPoints:
          defData?.variant?.data && defData?.variant?.data?.length > 0
            ? defData?.variant?.data[1]?.map((item) => {
                return { name: item.Age, y: item.Count };
              })
            : [],
      },
    ],
  });
  console.log(defData);

  useEffect(() => {
    if (defData?.variant?.data) {
      let sum =
        defData?.variant?.data?.length > 0 &&
        defData?.variant?.data[1]?.reduce((prev, curr) => {
          return prev + curr.Count;
        }, 0);

      setBarData({
        animationEnabled: true,
       
        subtitles: [
          {
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true,
          },
        ],
        data: [
          {
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#.#'%'",
            dataPoints:
              defData?.variant?.data && defData?.variant?.data?.length > 0
                ? defData?.variant?.data[1]?.map((item) => {
                    return { name: item.Age, y: (item.Count * 100) / sum };
                  })
                : [],
          },
        ],
      });
    }
  }, [defData]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getDefaultData(
        `EXEC [dbo].[GetAgeDistribution]
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
        "variant"
      )
    );
  }, [dispatch, isChange]);

  return (
    <div>
      <CardLoader loading={defData?.variant?.loading} />

      {defData?.variant?.data && (
        <Box
          sx={{
            height: "70vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CanvasJSChart options={barData} height={"100%"} />
        </Box>
      )}
    </div>
  );
}
