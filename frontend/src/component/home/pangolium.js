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
import { Bar, Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  getDefaultData,
  getNContentData,
} from "../../store/actions/dataAction";
import { Loader } from "../../component/loader";
import BarGraph from "../barGraph";
import Chart from "react-apexcharts";
import { CardLoader } from "../cardLoader";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function Pangolium({ location, startDate, endDate, isChange }) {
  const { defData, loading } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getDefaultData(
        `[dbo].[GetCorrelationBetweenCladeandVariant]
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
        "pangolium"
      )
    );
  }, [dispatch, isChange]);

  return (
    <div>
      <CardLoader loading={defData?.pangolium?.loading} />

      <Box
        sx={{
          height: "70vh",
          width: "100%",
        }}
      >
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
              width: "100%",
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
              text: "Correlation Between Clade and Variant",
            },
            xaxis: {
              categories:
                defData?.pangolium?.data && defData?.pangolium?.data?.length > 0
                  ? JSON.parse(
                      defData?.pangolium?.data[1][0]?.VariantCladeRelation
                    )?.VariantCladeRelation?.map((item) => {
                      return item.Clade;
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
              name: "Alpha",
              data:
                defData?.pangolium?.data && defData?.pangolium?.data?.length > 0
                  ? JSON.parse(
                      defData?.pangolium?.data[1][0]?.VariantCladeRelation
                    )?.VariantCladeRelation?.map((item) => {
                      return item?.Variants?.filter(
                        (items) => items.Variant == "Alpha"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#33b2df",
            },
            {
              name: "Beta",
              data:
                defData?.pangolium?.data && defData?.pangolium?.data?.length > 0
                  ? JSON.parse(
                      defData?.pangolium?.data[1][0]?.VariantCladeRelation
                    )?.VariantCladeRelation?.map((item) => {
                      return item?.Variants?.filter(
                        (items) => items.Variant == "Beta"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#546E7A",
            },
            {
              name: "Delta",
              data:
                defData?.pangolium?.data && defData?.pangolium?.data?.length > 0
                  ? JSON.parse(
                      defData?.pangolium?.data[1][0]?.VariantCladeRelation
                    )?.VariantCladeRelation?.map((item) => {
                      return item?.Variants?.filter(
                        (items) => items.Variant == "Delta"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#d4526e",
            },
            {
              name: "Epsilon",
              data:
                defData?.pangolium?.data && defData?.pangolium?.data?.length > 0
                  ? JSON.parse(
                      defData?.pangolium?.data[1][0]?.VariantCladeRelation
                    )?.VariantCladeRelation?.map((item) => {
                      return item?.Variants?.filter(
                        (items) => items.Variant == "Epsilon"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#13d8aa",
            },
            {
              name: "Eta",
              data:
                defData?.pangolium?.data && defData?.pangolium?.data?.length > 0
                  ? JSON.parse(
                      defData?.pangolium?.data[1][0]?.VariantCladeRelation
                    )?.VariantCladeRelation?.map((item) => {
                      return item?.Variants?.filter(
                        (items) => items.Variant == "Eta"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#A5978B",
            },
            {
              name: "Gamma",
              data:
                defData?.pangolium?.data && defData?.pangolium?.data?.length > 0
                  ? JSON.parse(
                      defData?.pangolium?.data[1][0]?.VariantCladeRelation
                    )?.VariantCladeRelation?.map((item) => {
                      return item?.Variants?.filter(
                        (items) => items.Variant == "Gamma"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#2b958f",
            },
            {
              name: "GH/490R",
              data:
                defData?.pangolium?.data && defData?.pangolium?.data?.length > 0
                  ? JSON.parse(
                      defData?.pangolium?.data[1][0]?.VariantCladeRelation
                    )?.VariantCladeRelation?.map((item) => {
                      return item?.Variants?.filter(
                        (items) => items.Variant == "GH/490R"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#f9a3a4",
            },
            {
              name: "Iota",
              data:
                defData?.pangolium?.data && defData?.pangolium?.data?.length > 0
                  ? JSON.parse(
                      defData?.pangolium?.data[1][0]?.VariantCladeRelation
                    )?.VariantCladeRelation?.map((item) => {
                      return item?.Variants?.filter(
                        (items) => items.Variant == "Iota"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#90ee7e",
            },
            {
              name: "Kappa",
              data:
                defData?.pangolium?.data && defData?.pangolium?.data?.length > 0
                  ? JSON.parse(
                      defData?.pangolium?.data[1][0]?.VariantCladeRelation
                    )?.VariantCladeRelation?.map((item) => {
                      return item?.Variants?.filter(
                        (items) => items.Variant == "Kappa"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#f48024",
            },
            {
              name: "Lambda",
              data:
                defData?.pangolium?.data && defData?.pangolium?.data?.length > 0
                  ? JSON.parse(
                      defData?.pangolium?.data[1][0]?.VariantCladeRelation
                    )?.VariantCladeRelation?.map((item) => {
                      return item?.Variants?.filter(
                        (items) => items.Variant == "Lambda"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "#74d9a8",
            },
            {
              name: "Mu",
              data:
                defData?.pangolium?.data && defData?.pangolium?.data?.length > 0
                  ? JSON.parse(
                      defData?.pangolium?.data[1][0]?.VariantCladeRelation
                    )?.VariantCladeRelation?.map((item) => {
                      return item?.Variants?.filter(
                        (items) => items.Variant == "Mu"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "rgba(255, 235, 59)",
            },
            {
              name: "Omicron",
              data:
                defData?.pangolium?.data && defData?.pangolium?.data?.length > 0
                  ? JSON.parse(
                      defData?.pangolium?.data[1][0]?.VariantCladeRelation
                    )?.VariantCladeRelation?.map((item) => {
                      return item?.Variants?.filter(
                        (items) => items.Variant == "Omicron"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "rgba(180, 200, 246)",
            },
            {
              name: "Theta",
              data:
                defData?.pangolium?.data && defData?.pangolium?.data?.length > 0
                  ? JSON.parse(
                      defData?.pangolium?.data[1][0]?.VariantCladeRelation
                    )?.VariantCladeRelation?.map((item) => {
                      return item?.Variants?.filter(
                        (items) => items.Variant == "Theta"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "rgba(1, 10, 286)",
            },
            {
              name: "Zeta",
              data:
                defData?.pangolium?.data && defData?.pangolium?.data?.length > 0
                  ? JSON.parse(
                      defData?.pangolium?.data[1][0]?.VariantCladeRelation
                    )?.VariantCladeRelation?.map((item) => {
                      return item?.Variants?.filter(
                        (items) => items.Variant == "Zeta"
                      )[0]?.Count;
                    })
                  : [],
              backgroundColor: "rgba(10, 200, 246)",
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
