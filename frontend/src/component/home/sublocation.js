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
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  getDefaultData,
  getNContentData,
} from "../../store/actions/dataAction";
import { Loader } from "../../component/loader";
import BarGraph from "../barGraph";
import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";
import Chart from "react-apexcharts";
import { CardLoader } from "../cardLoader";

ChartJS.register(...registerables, ChartjsPluginStacked100);

export default function Subloc({ location, startDate, endDate, isChange }) {
  const { defData, loading } = useSelector((state) => state.data);
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: "Month-wise Distribution",
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
    if (defData?.subloc?.data) {
      setBarData({
        labels:
          defData?.subloc?.data && defData?.subloc?.data?.length > 0
            ? defData?.subloc?.data[1]?.map((item) => {
                return item.Date;
              })
            : [],
        datasets: [
          {
            label: "Month-wise Distribution",
            data:
              defData?.subloc?.data && defData?.subloc?.data?.length > 0
                ? defData?.subloc?.data[1]?.map((item) => {
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
        ` [dbo].[GetDateDistributionForALocation]
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
        "subloc"
      )
    );
  }, [dispatch, isChange]);

  return (
    <div>
      <Box
        sx={{
          height: "70vh",
          width: "100%",
        }}
      >
        <CardLoader loading={defData?.subloc?.loading} />

        <Chart
          options={{
            colors: [
              "#FF6633",
              "#F229FF",
              "#809980",
              "#100F99",
              "#00B3E6",
              "#E6B333",
              "#3366E6",
              "#999966",
              "#4DB380",
              "#B34D4D",
              "#80B300",
              "#809900",
              "#E6B3B3",
              "#6680B3",
              "#66991A",
              "#FF99E6",
              "#CCFF1A",
              "#FF1A66",
              "#E6331A",
              "#33FFCC",
              "#66994D",
              "#B366CC",
              "#4D8000",
              "#B33300",
              "#CC80CC",
              "#991AFF",
              "#E666FF",
              "#4DB3FF",
              "#1AB399",
              "#E666B3",
              "#33991A",
              "#CC9999",
              "#B3B31A",
              "#00E680",
              "#4D8066",
              "#809980",
              "#E6FF80",
              "#1AFF33",
              "#999933",
              "#FF3380",
              "#CCCC00",
              "#66E64D",
              "#4D80CC",
              "#9900B3",
              "#E64D66",
              "#4DB380",
              "#FF4D4D",
              "#99E6E6",
              "#6666FF",
            ],
            chart: {
              type: "bar",
              height: 350,
              stacked: true,
              stackType: "100%",
              width: "500px",
            },
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            stroke: {
              width: 0,
              colors: ["#fff"],
            },
            title: {
              text: "Month-wise Distribution",
            },
            xaxis: {
              categories:
                defData?.subloc?.data && defData?.subloc?.data?.length > 0
                  ? JSON.parse(
                      defData?.subloc?.data[1][0]?.Distrubutionjson
                    )?.Distributionjson?.map((item) => {
                      return item.Year;
                    })
                  : [],
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val;
                },
              },
            },
            fill: {
              opacity: 1,
            },
            legend: {
              position: "top",
              horizontalAlign: "left",
              offsetX: 40,
            },
          }}
          series={[
            {
              name: "January",
              data:
                defData?.subloc?.data && defData?.subloc?.data?.length > 0
                  ? JSON.parse(
                      defData?.subloc?.data[1][0]?.Distrubutionjson
                    )?.Distributionjson?.map((item) => {
                      return item?.Months?.filter(
                        (items) => items.Month == "Jan"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#33b2df",
            },
            {
              name: "Febuary",
              data:
                defData?.subloc?.data && defData?.subloc?.data?.length > 0
                  ? JSON.parse(
                      defData?.subloc?.data[1][0]?.Distrubutionjson
                    )?.Distributionjson?.map((item) => {
                      return item?.Months?.filter(
                        (items) => items.Month == "Feb"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#546E7A",
            },
            {
              name: "March",
              data:
                defData?.subloc?.data && defData?.subloc?.data?.length > 0
                  ? JSON.parse(
                      defData?.subloc?.data[1][0]?.Distrubutionjson
                    )?.Distributionjson?.map((item) => {
                      return item?.Months?.filter(
                        (items) => items.Month == "Mar"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#d4526e",
            },
            {
              name: "April",
              data:
                defData?.subloc?.data && defData?.subloc?.data?.length > 0
                  ? JSON.parse(
                      defData?.subloc?.data[1][0]?.Distrubutionjson
                    )?.Distributionjson?.map((item) => {
                      return item?.Months?.filter(
                        (items) => items.Month == "Apr"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#13d8aa",
            },
            {
              name: "May",
              data:
                defData?.subloc?.data && defData?.subloc?.data?.length > 0
                  ? JSON.parse(
                      defData?.subloc?.data[1][0]?.Distrubutionjson
                    )?.Distributionjson?.map((item) => {
                      return item?.Months?.filter(
                        (items) => items.Month == "May"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#A5978B",
            },
            {
              name: "June",
              data:
                defData?.subloc?.data && defData?.subloc?.data?.length > 0
                  ? JSON.parse(
                      defData?.subloc?.data[1][0]?.Distrubutionjson
                    )?.Distributionjson?.map((item) => {
                      return item?.Months?.filter(
                        (items) => items.Month == "Jun"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#9b908f",
            },
            {
              name: "July",
              data:
                defData?.subloc?.data && defData?.subloc?.data?.length > 0
                  ? JSON.parse(
                      defData?.subloc?.data[1][0]?.Distrubutionjson
                    )?.Distributionjson?.map((item) => {
                      return item?.Months?.filter(
                        (items) => items.Month == "Jul"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#f9a3a4",
            },
            {
              name: "August",
              data:
                defData?.subloc?.data && defData?.subloc?.data?.length > 0
                  ? JSON.parse(
                      defData?.subloc?.data[1][0]?.Distrubutionjson
                    )?.Distributionjson?.map((item) => {
                      return item?.Months?.filter(
                        (items) => items.Month == "Aug"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#90ee7e",
            },
            {
              name: "September",
              data:
                defData?.subloc?.data && defData?.subloc?.data?.length > 0
                  ? JSON.parse(
                      defData?.subloc?.data[1][0]?.Distrubutionjson
                    )?.Distributionjson?.map((item) => {
                      return item?.Months?.filter(
                        (items) => items.Month == "Sep"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#f48024",
            },
            {
              name: "October",
              data:
                defData?.subloc?.data && defData?.subloc?.data?.length > 0
                  ? JSON.parse(
                      defData?.subloc?.data[1][0]?.Distrubutionjson
                    )?.Distributionjson?.map((item) => {
                      return item?.Months?.filter(
                        (items) => items.Month == "Oct"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#90e2a7",
            },
            {
              name: "November",
              data:
                defData?.subloc?.data && defData?.subloc?.data?.length > 0
                  ? JSON.parse(
                      defData?.subloc?.data[1][0]?.Distrubutionjson
                    )?.Distributionjson?.map((item) => {
                      return item?.Months?.filter(
                        (items) => items.Month == "Nov"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "rgba(255, 235, 59)",
            },
            {
              name: "December",
              data:
                defData?.subloc?.data && defData?.subloc?.data?.length > 0
                  ? JSON.parse(
                      defData?.subloc?.data[1][0]?.Distrubutionjson
                    )?.Distributionjson?.map((item) => {
                      return item?.Months?.filter(
                        (items) => items.Month == "Dec"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "rgba(180, 20, 246)",
            },
          ]}
          type="bar"
          height={500}
          width={"100%"}
        />
      </Box>
    </div>
  );
}
