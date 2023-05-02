import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import NavBar from '../../component/navbar';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getData, getDefaultData, getNContentData } from '../../store/actions/dataAction';
import { Loader } from '../../component/loader';
import BarGraph from '../barGraph';
import countrys from '../../pages/home/country.json';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title);


export default function Country() {
    const [countryData, setCountryData] = useState("");

    const { defData, loading } = useSelector((state) => state.data);
    const [barData, setBarData] = useState({
        labels: [],
        datasets: [{
            label: 'Country Data',
            data: [],
            backgroundColor: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
                '#f48024', '#69d2e7'
              ],
            borderColor: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
                '#f48024', '#69d2e7'
              ],
            borderWidth: 1
        }]
    });
    console.log(defData);


    useEffect(() => {
        if (defData?.country?.data) {
            setBarData({
                labels: defData?.country?.data && defData?.country?.data?.length > 0 ? defData?.country?.data?.map((item) => { return item.date }) : [],
                datasets: [{
                    label: 'Country Data',
                    data: defData?.country?.data && defData?.country?.data?.length > 0 ? defData?.country?.data?.map((item) => { return item.count }) : [],
                    backgroundColor: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
                '#f48024', '#69d2e7'
              ],
                    borderColor: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
                '#f48024', '#69d2e7'
              ],
                    borderWidth: 1
                }]
            })
        }
    }, [defData]);






    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDefaultData(`SELECT Count(*) as count,CONVERT(VARCHAR(2),MONTH(Collection_date)) + '-' + 
        CONVERT(VARCHAR(4),YEAR(Collection_date)) AS date FROM tempdata where REPLACE (CASE 
    WHEN CHARINDEX('/', Location) > 0 AND CHARINDEX('/', Location, CHARINDEX('/', Location)+1) > 0 
    THEN SUBSTRING(Location, CHARINDEX('/', Location)+1, CHARINDEX('/', Location, CHARINDEX('/', Location)+1) - CHARINDEX('/', Location) - 1) 
    ELSE SUBSTRING(Location, CHARINDEX('/', Location)+1, LEN(Location)-1) 
END,' ','') LIKE '${countryData}' GROUP BY

    MONTH(Collection_date),
    YEAR(Collection_date);
        `, "country"));
    }, [dispatch, countryData]);




    return (
        <div>
            <TextField
                value={countryData}
                id="country"
                type="select"
                select
                name="country"
                label="Country"
                fullWidth
                placeholder="Country"
                variant="outlined"
                onChange={(e) => { setCountryData(e.target.value) }}
            >
                {countrys.map((item) => {
                    return (
                        <MenuItem value={item.name} key={item.name}>
                            {item?.name}
                        </MenuItem>)
                })}
            </TextField>
            <BarGraph defData={defData?.country?.data} barData={barData} />


        </div>
    );
}
