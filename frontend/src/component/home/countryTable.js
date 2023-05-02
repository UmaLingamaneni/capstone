import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { CSVLink, CSVDownload } from "react-csv";
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
  getDefaultDataCSV,
  getNContentData,
} from "../../store/actions/dataAction";
import { Loader } from "../../component/loader";
import BarGraph from "../barGraph";
import countrys from "../../pages/home/country.json";
import { tableCellClasses } from "@mui/material/TableCell";
import location from "../../pages/home/allcountryjson.json";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { loadUser } from "../../store/actions/userActions";
import moment from "moment";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: "bold",
    border: "1px solid gray",
  },
}));

export default function CountryTableAllData() {
  const [countryDataAll, setCountryDataAll] = useState([]);
  const [stateDataAll, setStateDataAll] = useState([]);
  const [regionDataAll, setRegionDataAll] = useState([]);
  const [region2DataAll, setRegion2DataAll] = useState([]);

  const [locationData, setLocationData] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndnData] = useState(null);

  console.log(locationData);

  const { defData, loading } = useSelector((state) => state.data);

  const [page, setPage] = useState(0);

  const dispatch = useDispatch();

  // useEffect(() => {
  //     //     dispatch(getDefaultData(`SELECT * FROM tempdata where REPLACE (CASE
  //     //     WHEN CHARINDEX('/', Location) > 0 AND CHARINDEX('/', Location, CHARINDEX('/', Location)+1) > 0
  //     //     THEN SUBSTRING(Location, CHARINDEX('/', Location)+1, CHARINDEX('/', Location, CHARINDEX('/', Location)+1) - CHARINDEX('/', Location) - 1)
  //     //     ELSE SUBSTRING(Location, CHARINDEX('/', Location)+1, LEN(Location)-1)
  //     // END,' ','') LIKE '${countryData}';
  //     //         `, "countryAllData"));

  //     console.log(Object.values(locationData).join('/'));
  //     dispatch(getDefaultData(`SELECT * FROM tempdata where Location = '${Object.values(locationData)?.length > 0 ? Object.values(locationData).join('/') : ""}';
  //         `, "countryAllData"));

  // }, [dispatch, locationData]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getDefaultData(
        `EXEC GetCovidDataRowCount @StartDate = ${
          startDate ? `'${startDate}'` : null
        }, @EndDate = ${endDate ? `'${endDate}'` : null}, @Continent = ${
          locationData?.continent
            ? `'${locationData?.continent?.trim()}'`
            : null
        }, @Country = ${
          locationData?.country ? `'${locationData?.country?.trim()}'` : null
        }, @State_or_Province = ${
          locationData?.state ? `'${locationData?.state?.trim()}'` : null
        }, @Sub_region_1 = ${
          locationData?.region ? `'${locationData?.region?.trim()}'` : null
        }, @Sub_region_2 = ${
          locationData?.region2 ? `'${locationData?.region2?.trim()}'` : null
        };`,
        "countryCount"
      )
    );
    // dispatch(getDefaultData(`EXEC GetCovidData @StartDate = ${startDate ? `'${startDate}'` : null}, @EndDate = ${endDate ? `'${endDate}'` : null}, @Continent = ${locationData?.continent ? `'${locationData?.continent?.trim()}'` : null}, @Country = ${locationData?.country ? `'${locationData?.country?.trim()}'` : null}, @State_or_Province = ${locationData?.state ? `'${locationData?.state?.trim()}'` : null}, @Sub_region_1 = ${locationData?.region ? `'${locationData?.region?.trim()}'` : null}, @Sub_region_2 = ${locationData?.region2 ? `'${locationData?.region2?.trim()}'` : null}, @pageSize = 10000000 ,@pageNumber = ${1};`, "countryAllDataCSV"));
  }, [locationData, startDate, endDate]);

  useEffect(() => {
    if (page >= 1) {
      dispatch(
        getDefaultData(
          `EXEC GetCovidData @StartDate = ${
            startDate ? `'${startDate}'` : null
          }, @EndDate = ${endDate ? `'${endDate}'` : null}, @Continent = ${
            locationData?.continent
              ? `'${locationData?.continent?.trim()}'`
              : null
          }, @Country = ${
            locationData?.country ? `'${locationData?.country?.trim()}'` : null
          }, @State_or_Province = ${
            locationData?.state ? `'${locationData?.state?.trim()}'` : null
          }, @Sub_region_1 = ${
            locationData?.region ? `'${locationData?.region?.trim()}'` : null
          }, @Sub_region_2 = ${
            locationData?.region2 ? `'${locationData?.region2?.trim()}'` : null
          }, @pageSize = 10 ,@pageNumber = ${page + 1};`,
          "countryAllData"
        )
      );
    }
  }, [page]);

  console.log(defData);

  const handleChangePage = React.useCallback((event, newPage) => {
    setPage(newPage);

    // Avoid a layout jump when reaching the last page with empty rows.
  }, []);

  return (
    <Grid container spacing={1}>
      <Loader loading={defData?.countryAllData?.loading} />
      <Grid item xs={12} md={12}>
        <Card
          sx={{ p: 3, borderRadius: "20px", boxShadow: "5px 5px 2px #aaaaaa" }}
        >
          <Stack
            direction="row"
            spacing={3}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box sx={{ width: "100%" }}>
              <label
                htmlFor="standard-select-currency-native"
                style={{ paddingBottom: "20px" }}
              >
                Continent
              </label>
              <TextField
                id="standard-select-currency-native"
                select
                label="--Select--"
                fullWidth
                variant="outlined"
                onChange={(e) => {
                  setCountryDataAll(
                    location?.filter(
                      (item) => item.continent == e.target.value
                    )[0]?.country
                  );
                  setLocationData({ continent: e.target.value });
                }}
              >
                {location?.map((item) => {
                  return (
                    <MenuItem value={item?.continent} key={item?.continent}>
                      {item?.continent}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Box>
            <Box sx={{ width: "100%" }}>
              <label
                htmlFor="standard-select-country-native"
                style={{ paddingBottom: "20px" }}
              >
                Country
              </label>
              <TextField
                id="standard-select-country-native"
                select
                label="--Select--"
                disabled={locationData?.continent ? false : true}
                onChange={(e) => {
                  setStateDataAll(
                    countryDataAll?.filter(
                      (item) => item.country == e.target.value
                    )[0]?.state
                  );
                  setLocationData({
                    continent: locationData?.continent,
                    country: e.target.value,
                  });
                }}
                fullWidth
                variant="outlined"
              >
                {countryDataAll?.map((countrys) => (
                  <MenuItem value={countrys?.country}>
                    {countrys?.country}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ width: "100%" }}>
              <label
                htmlFor="standard-select-state-native"
                style={{ paddingBottom: "20px" }}
              >
                State
              </label>

              <TextField
                id="standard-select-state-native"
                select
                disabled={locationData?.country ? false : true}
                label="--Select--"
                onChange={(e) => {
                  setRegionDataAll(
                    stateDataAll?.filter(
                      (item) => item.state == e.target.value
                    )[0]?.region
                  );
                  setLocationData({
                    continent: locationData?.continent,
                    country: locationData?.country,
                    state: e.target.value,
                  });
                }}
                fullWidth
                variant="outlined"
              >
                {stateDataAll?.map((countrys) => (
                  <MenuItem value={countrys?.state}>{countrys?.state}</MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ width: "100%" }}>
              <label
                htmlFor="standard-select-region-native"
                style={{ paddingBottom: "20px" }}
              >
                City
              </label>

              <TextField
                id="standard-select-region-native"
                select
                label="--Select--"
                disabled={locationData?.state ? false : true}
                onChange={(e) => {
                  // setRegion2DataAll(
                  //   regionDataAll?.filter(
                  //     (item) => item.state == e.target.value
                  //   )[0]?.region2
                  // );
                  setLocationData({
                    continent: locationData?.continent,
                    country: locationData?.country,
                    state: locationData?.state,
                    region: e.target.value,
                  });
                }}
                fullWidth
                variant="outlined"
              >
                {regionDataAll?.map((countrys) => (
                  <MenuItem value={countrys}>{countrys}</MenuItem>
                ))}
              </TextField>
            </Box>
            {/* <Box sx={{ width: "100%" }}>
              <label
                htmlFor="standard-select-region2-native"
                style={{ paddingBottom: "20px" }}
              >
                Region
              </label>
              <TextField
                id="standard-select-region2-native"
                disabled={locationData?.region ? false : true}
                select
                label="--Select--"
                onChange={(e) => {
                  setLocationData({ ...locationData, region2: e.target.value });
                }}
                fullWidth
                variant="outlined"
              >
                {region2DataAll?.map((countrys) => (
                  <MenuItem value={countrys}>{countrys}</MenuItem>
                ))}
              </TextField>
            </Box> */}
            <Box sx={{ width: "100%" }}>
              <label htmlFor="startDate" style={{ paddingBottom: "20px" }}>
                Start Date
              </label>
              <TextField
                id="startDate"
                type="date"
                label=""
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <label htmlFor="endDate" style={{ paddingBottom: "20px" }}>
                End Date
              </label>
              <TextField
                id="endDate"
                type="date"
                label=""
                onChange={(e) => {
                  setEndnData(e.target.value);
                }}
                fullWidth
                variant="outlined"
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <label htmlFor="endDate" style={{ paddingBottom: "20px" }}>
                Row Count
              </label>
              <TextField
                id="endDate"
                type="text"
                label=""
                value={
                  defData?.countryCount?.data?.length > 0 &&
                  defData?.countryCount?.data[0]?.length > 0 &&
                  defData?.countryCount?.data[0][0]?.RowCount
                }
                fullWidth
                variant="outlined"
              />
            </Box>
          </Stack>
          
          <Stack
            direction="row"
            spacing={3}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              sx={{ height: "40px", px: 5, mt: 3, width: "100%" }}
              variant="contained"
              onClick={() => {
                dispatch(
                  getDefaultData(
                    `EXEC GetCovidData @StartDate = ${
                      startDate
                        ? `'${moment(startDate).format("YYYY-MM-DD")}'`
                        : null
                    }, @EndDate = ${
                      endDate
                        ? `'${moment(endDate).format("YYYY-MM-DD")}'`
                        : null
                    }, @Continent = ${
                      locationData?.continent
                        ? `'${locationData?.continent?.trim()}'`
                        : null
                    }, @Country = ${
                      locationData?.country
                        ? `'${locationData?.country?.trim()}'`
                        : null
                    }, @State_or_Province = ${
                      locationData?.state
                        ? `'${locationData?.state?.trim()}'`
                        : null
                    }, @Sub_region_1 = ${
                      locationData?.region
                        ? `'${locationData?.region?.trim()}'`
                        : null
                    }, @Sub_region_2 = ${
                      locationData?.region2
                        ? `'${locationData?.region2?.trim()}'`
                        : null
                    }, @pageSize = 10,@pageNumber = 1;`,
                    "countryAllData"
                  )
                );
                setPage(0);
              }}
            >
              Apply
            </Button>
            <Button
              sx={{ height: "40px", px: 5, mt: 4, width: "100%" }}
              style={{ marginTop: "24px" }}
              variant="contained"
              onClick={() => {
                dispatch(
                  getDefaultDataCSV(
                    `EXEC GetCovidData @StartDate = ${
                      startDate ? `'${startDate}'` : null
                    }, @EndDate = ${
                      endDate ? `'${endDate}'` : null
                    }, @Continent = ${
                      locationData?.continent
                        ? `'${locationData?.continent?.trim()}'`
                        : null
                    }, @Country = ${
                      locationData?.country
                        ? `'${locationData?.country?.trim()}'`
                        : null
                    }, @State_or_Province = ${
                      locationData?.state
                        ? `'${locationData?.state?.trim()}'`
                        : null
                    }, @Sub_region_1 = ${
                      locationData?.region
                        ? `'${locationData?.region?.trim()}'`
                        : null
                    }, @Sub_region_2 = ${
                      locationData?.region2
                        ? `'${locationData?.region2?.trim()}'`
                        : null
                    }, @pageSize = 100000000,@pageNumber = 1;`
                  )
                );
              }}
            >
              Download CSV
            </Button>
          </Stack>
        </Card>
        {/* SELECT * FROM tempdata where Location LIKE '${Object.values(locationData)?.length > 0 ? Object.values(locationData).join('/') : ""}% */}
      </Grid>
      <Grid item xs={12} md={12}>
        <Card
          sx={{
            p: 3,
            mt: 4,
            borderRadius: "20px",
            boxShadow: "5px 5px 2px #aaaaaa",
          }}
        >
          {defData?.countryAllData?.data &&
            defData?.countryAllData?.data?.length > 0 && (
              <>
                <TableContainer
                  sx={{ maxHeight: "80vh", borderLeft: "1px solid gray" }}
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {defData?.countryAllData?.data[0]?.length > 0 &&
                          Object.keys(defData?.countryAllData?.data[0][0])
                            ?.filter((row) => row != "AA_Substitutions")
                            ?.map((row) => (
                              <StyledTableCell align={"left"}>
                                {row}
                              </StyledTableCell>
                            ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {defData?.countryAllData?.data[0]?.map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {Object.keys(defData?.countryAllData?.data[0][0])
                              ?.filter((row) => row != "AA_Substitutions")
                              ?.map((rows) => (
                                <TableCell align={"left"}>
                                  {rows == "Collection_date" ||
                                  rows == "Pangolin_version" ||
                                  rows == "Submission_date"
                                    ? moment(row[rows]).format("MM/DD/YYYY")
                                    : row[rows]}
                                </TableCell>
                              ))}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10]}
                  component="div"
                  count={defData?.countryCount?.data[0][0]?.RowCount}
                  rowsPerPage={10}
                  page={page}
                  onPageChange={handleChangePage}
                  // onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
        </Card>
      </Grid>
    </Grid>
  );
}
