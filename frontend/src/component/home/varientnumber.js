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


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title);


export default function Variant({location,startDate,endDate,isChange}) {

    const { defData, loading } = useSelector((state) => state.data);
    const [barData, setBarData] = useState({
        labels: [],
        datasets: [{
            label: 'Variant Data',
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
        if (defData?.variant?.data) {
            setBarData({
                labels: defData?.variant?.data && defData?.variant?.data?.length > 0 ? defData?.variant?.data[1]?.filter((item) => item.Age != "uncertain/unkown")?.map((item) => { return item.Age }) : [],
                datasets: [{
                    label: 'Age Distribution',
                    data: defData?.variant?.data && defData?.variant?.data?.length > 0 ? defData?.variant?.data[1]?.filter((item) => item.Age != "uncertain/unkown")?.map((item) => { return parseInt(item.Count) }) : [],
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
        dispatch(getDefaultData(`EXEC [dbo].[GetAgeDistribution]
		@StartDate = ${startDate ? `'${startDate}'` : null}, @EndDate = ${endDate ? `'${endDate}'` : null}, @Continent = ${location?.continent ? `'${location?.continent?.trim()}'` : null}, @Country = ${location?.country ? `'${location?.country?.trim()}'` : null}, @State_or_Province = ${location?.state ? `'${location?.state?.trim()}'` : null}, @Sub_region_1 = ${location?.region ? `'${location?.region?.trim()}'` : null}, @Sub_region_2 = ${location?.region2 ? `'${location?.region2?.trim()}'` : null};
        `, "variant"));
    }, [dispatch,isChange]);




    return (
        <div>


            <BarGraph loading={defData?.variant?.loading} defData={defData?.variant?.data} barData={barData} />

            


        </div>
    );
}
