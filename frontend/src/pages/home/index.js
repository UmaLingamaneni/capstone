import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  InputLabel,
  Divider,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Stack,
  SwipeableDrawer,
  Tab,
  Tabs,
  TextField,
  Typography,
  FormControl,
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
import { Loader } from "../../component/loader";
import MenuIcon from "@mui/icons-material/Menu";
import Variant from "../../component/home/varientnumber";
import TopFiveTotalCase from "../../component/home/top5countrytotalcases";
import CountryTable from "../../component/home/everycountrycasestable";
import GenderCombineVsUnknown from "../../component/home/genderCombineVsUnknown";
import Age from "../../component/home/agenumber";
import Clade from "../../component/home/cladvsnumber";
import Gender from "../../component/home/gendernumber";
import TopFive from "../../component/home/top5data";
import Country from "../../component/home/monthwiseCountryData";
import CountryTableAllData from "../../component/home/countryTable";
import Subloc from "../../component/home/sublocation";
import Pangolium from "../../component/home/pangolium";
import location from "./allcountryjson.json";
import N_Content from "../ncontent/ncontent";
import AgeDistPieChart from "../../component/home/ageDistPieChart";
import GenderDistPieChart from "../../component/home/genderDistPieChart";
import { getDefaultData } from "../../store/actions/dataAction";

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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [indexes, setIndexes] = useState(1);

  const { data, loading } = useSelector((state) => state.data);

  const [value, setValue] = React.useState(0);

  const [countryDataAll, setCountryDataAll] = useState([]);
  const [stateDataAll, setStateDataAll] = useState([]);
  const [regionDataAll, setRegionDataAll] = useState([]);
  const [region2DataAll, setRegion2DataAll] = useState({});

  const [locationData, setLocationData] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndnData] = useState(null);

  const [isChanges, setIsChanges] = useState(false);
  const [isChangesClick, setIsChangesClick] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setLocationData({});
    setIsChangesClick(false);
  };

  const dispatch = useDispatch();

  // useEffect(() => {
  //     console.log([...new Set(location.map((name) => name?.Continent))].map((item) => {
  //         return ({
  //             continent: item,
  //             country: [...new Set(location.filter((countr) => countr?.Continent == item).map((countr) => countr?.Country))].map((countr) => {
  //                 return ({
  //                     country: countr,
  //                     state: [
  //                         ...new Set(location.filter((states) => states?.Country == countr).map((states) => states["Province or State"]))
  //                     ].map((reg) => {
  //                         return ({
  //                             state: reg,
  //                             region: [
  //                                 ...new Set(location.filter((region) => region["Province or State"] == reg).map((region) => region["Subregion-2"]))
  //                             ].map((region2) => {
  //                                 return ({
  //                                     region: region2,
  //                                     region2: [
  //                                         ...new Set(location.filter((reg2) => reg2["Subregion-2"] == region2).map((reg2) => reg2["SubRegion-2"]))
  //                                     ]
  //                                 })
  //                             })
  //                         })
  //                     })
  //                 })
  //             })
  //         })

  //     }))
  // }, [])

  // drawer open

  const [state, setState] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem
          onClick={() => {
            setIndexes(1);
          }}
          disablePadding
        >
          <ListItemButton>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={() => {
            setIndexes(2);
          }}
          disablePadding
        >
          <ListItemButton>
            <ListItemText primary={"Age,Clade,Gender"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={() => {
            setIndexes(3);
          }}
          disablePadding
        >
          <ListItemButton>
            <ListItemText primary={"Filters"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={() => {
            setIndexes(4);
          }}
          disablePadding
        >
          <ListItemButton>
            <ListItemText primary={"Show Country Data"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

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
  const { defData } = useSelector((state) => state.data);

  return (
    <div>
      <Loader loading={loading} />
      <NavBar />

      <Grid
        sx={{ justifyContent: "center", alignItems: "center" }}
        container
        spacing={4}
      >
        <Grid item xs={12} sm={4}>
          <Box sx={{ p: 2, ml: 6 }}>
            <Typography variant="h5" fontFamily={"cursive"}>
              Corona Virus Dashboard
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="basic tabs example"
            sx={{ backgroundColor: "white" }}
          >
            <Tab
              sx={{ fontWeight: "bold" }}
              label="Raw Data"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ fontWeight: "bold" }}
              label="Statistics "
              {...a11yProps(1)}
            />
            <Tab
              sx={{ fontWeight: "bold" }}
              label="clade-variant insights"
              {...a11yProps(2)}
            />
            <Tab
              sx={{ fontWeight: "bold" }}
              label="N Content "
              {...a11yProps(3)}
            />
          </Tabs>
        </Grid>
      </Grid>

      <TabPanel value={value} index={0}>
        <Box sx={{ my: -3, px: 3, py: 0 }}>
          <CountryTableAllData />
        </Box>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Card
          sx={{
            p: 3,
            my: -2,
            borderRadius: "20px",
            boxShadow: "5px 5px 2px #aaaaaa",
          }}
        >
          <Stack direction="row" spacing={3}>
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

          <Stack>
            <Button
              sx={{ height: "40px", px: 5, mt: 3 }}
              variant="contained"
              onClick={() => {
                setIsChanges(!isChanges);
                setIsChangesClick(true);
                setRegion2DataAll(locationData);
              }}
            >
              Apply
            </Button>
          </Stack>
        </Card>
        {isChangesClick && (
          <Grid
            sx={{ justifyContent: "center", alignItems: "center", my: 4 }}
            container
            spacing={4}
          >
            <Grid item xs={10} sm={5}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  boxShadow: "5px 5px 2px #aaaaaa",
                  height: "70vh",
                  position: "relative",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", fontWeight: "1000" }}
                >
                  Age Distribution{" "}
                  {region2DataAll?.region
                    ? region2DataAll?.region
                    : region2DataAll?.state
                    ? region2DataAll?.state
                    : region2DataAll?.country
                    ? region2DataAll?.country
                    : region2DataAll?.continent
                    ? region2DataAll?.continent
                    : ""}
                </Typography>
                <Variant
                  location={locationData}
                  endDate={endDate}
                  startDate={startDate}
                  isChange={isChanges}
                />
              </Card>
            </Grid>

            <Grid item xs={10} sm={5}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  boxShadow: "5px 5px 2px #aaaaaa",
                  height: "70vh",
                  position: "relative",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", fontWeight: "1000" }}
                >
                  Age Distribution{" "}
                  {region2DataAll?.region
                    ? region2DataAll?.region
                    : region2DataAll?.state
                    ? region2DataAll?.state
                    : region2DataAll?.country
                    ? region2DataAll?.country
                    : region2DataAll?.continent
                    ? region2DataAll?.continent
                    : ""}
                </Typography>
                <AgeDistPieChart
                  location={locationData}
                  endDate={endDate}
                  startDate={startDate}
                  isChange={isChanges}
                />
              </Card>
            </Grid>
            <Grid item xs={10} sm={5}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  boxShadow: "5px 5px 2px #aaaaaa",
                  height: "70vh",
                  position: "relative",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", fontWeight: "1000" }}
                >
                  Gender Distribution{" "}
                  {region2DataAll?.region
                    ? region2DataAll?.region
                    : region2DataAll?.state
                    ? region2DataAll?.state
                    : region2DataAll?.country
                    ? region2DataAll?.country
                    : region2DataAll?.continent
                    ? region2DataAll?.continent
                    : ""}
                </Typography>
                <GenderCombineVsUnknown
                  location={locationData}
                  endDate={endDate}
                  startDate={startDate}
                  isChange={isChanges}
                />
              </Card>
            </Grid>

            <Grid item xs={10} sm={5}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  boxShadow: "5px 5px 2px #aaaaaa",
                  height: "70vh",
                  position: "relative",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", fontWeight: "1000" }}
                >
                  Gender Distribution{" "}
                  {region2DataAll?.region
                    ? region2DataAll?.region
                    : region2DataAll?.state
                    ? region2DataAll?.state
                    : region2DataAll?.country
                    ? region2DataAll?.country
                    : region2DataAll?.continent
                    ? region2DataAll?.continent
                    : ""}
                </Typography>
                <GenderDistPieChart
                  location={locationData}
                  endDate={endDate}
                  startDate={startDate}
                  isChange={isChanges}
                />
              </Card>
            </Grid>

            {/* <Grid item xs={10} sm={5}>
            <Card
              sx={{
                p: 3,
                borderRadius: "20px",
                boxShadow: "5px 5px 2px #aaaaaa",
                height: "70vh",
                position: "relative",

              }}
            >
              <Typography variant="body2" sx={{ textAlign: "center",fontWeight:"1000" }}>
                Host Distribution
              </Typography>
              <Age
                location={locationData}
                endDate={endDate}
                startDate={startDate}
                isChange={isChanges}
              />
            </Card>
          </Grid> */}
            <Grid item xs={10} sm={10}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  boxShadow: "5px 5px 2px #aaaaaa",
                  height: "70vh",
                  position: "relative",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", fontWeight: "1000" }}
                >
                  Location Distribution{" "}
                  {region2DataAll?.region
                    ? region2DataAll?.region
                    : region2DataAll?.state
                    ? region2DataAll?.state
                    : region2DataAll?.country
                    ? region2DataAll?.country
                    : region2DataAll?.continent
                    ? region2DataAll?.continent
                    : ""}
                </Typography>
                <TopFiveTotalCase
                  location={locationData}
                  endDate={endDate}
                  startDate={startDate}
                  isChange={isChanges}
                />
              </Card>
            </Grid>
            <Grid item xs={10} sm={10}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  boxShadow: "5px 5px 2px #aaaaaa",
                  height: "70vh",
                  position: "relative",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", fontWeight: "1000" }}
                >
                  Month-wise Distribution{" "}
                  {region2DataAll?.region
                    ? region2DataAll?.region
                    : region2DataAll?.state
                    ? region2DataAll?.state
                    : region2DataAll?.country
                    ? region2DataAll?.country
                    : region2DataAll?.continent
                    ? region2DataAll?.continent
                    : ""}
                </Typography>
                <Subloc
                  location={locationData}
                  endDate={endDate}
                  startDate={startDate}
                  isChange={isChanges}
                />
              </Card>
            </Grid>
          </Grid>
        )}
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Card
          sx={{
            p: 3,
            my: -2,
            borderRadius: "20px",
            boxShadow: "5px 5px 2px #aaaaaa",
          }}
        >
          <Stack direction="row" spacing={3}>
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
          <Stack>
            <Button
              sx={{ height: "40px", px: 5, mt: 3 }}
              variant="contained"
              onClick={() => {
                setIsChanges(!isChanges);
                setIsChangesClick(true);
                setRegion2DataAll(locationData);
              }}
            >
              Apply
            </Button>
          </Stack>
        </Card>
        {isChangesClick && (
          <Grid
            sx={{ justifyContent: "center", alignItems: "center", my: 4 }}
            container
            spacing={4}
          >
            <Grid item xs={10} sm={5}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  boxShadow: "5px 5px 2px #aaaaaa",
                  height: "70vh",
                  position: "relative",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", fontWeight: "1000" }}
                >
                  Clade Distribution{" "}
                  {region2DataAll?.region
                    ? region2DataAll?.region
                    : region2DataAll?.state
                    ? region2DataAll?.state
                    : region2DataAll?.country
                    ? region2DataAll?.country
                    : region2DataAll?.continent
                    ? region2DataAll?.continent
                    : ""}
                </Typography>
                <Clade
                  location={locationData}
                  endDate={endDate}
                  startDate={startDate}
                  isChange={isChanges}
                />
              </Card>
            </Grid>
            <Grid item xs={10} sm={5}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  boxShadow: "5px 5px 2px #aaaaaa",
                  height: "70vh",
                  position: "relative",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", fontWeight: "1000" }}
                >
                  Variant Distribution{" "}
                  {region2DataAll?.region
                    ? region2DataAll?.region
                    : region2DataAll?.state
                    ? region2DataAll?.state
                    : region2DataAll?.country
                    ? region2DataAll?.country
                    : region2DataAll?.continent
                    ? region2DataAll?.continent
                    : ""}
                </Typography>
                <Gender
                  location={locationData}
                  endDate={endDate}
                  startDate={startDate}
                  isChange={isChanges}
                />
              </Card>
            </Grid>

            <Grid item xs={10} sm={10}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  boxShadow: "5px 5px 2px #aaaaaa",
                  height: "70vh",
                  position: "relative",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", fontWeight: "1000" }}
                >
                  Correlation Between Clade and Variant{" "}
                  {region2DataAll?.region
                    ? region2DataAll?.region
                    : region2DataAll?.state
                    ? region2DataAll?.state
                    : region2DataAll?.country
                    ? region2DataAll?.country
                    : region2DataAll?.continent
                    ? region2DataAll?.continent
                    : ""}
                </Typography>
                <Pangolium
                  location={locationData}
                  endDate={endDate}
                  startDate={startDate}
                  isChange={isChanges}
                />
              </Card>
            </Grid>
          </Grid>
        )}
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Grid
          sx={{ justifyContent: "center", alignItems: "center", my: 4 }}
          container
          spacing={4}
        >
          <N_Content />
        </Grid>
      </TabPanel>
    </div>
  );
}
