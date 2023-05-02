import React, { useEffect, useState } from 'react';
import { Box, Divider, IconButton, List, ListItem, ListItemButton, MenuItem, Stack, SwipeableDrawer, Tab, Tabs, TextField, Typography } from '@mui/material';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../store/actions/dataAction';
import moment from 'moment/moment';
import { Loader } from '../../component/loader';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title);



export default function TopFive() {

    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());


    const [state, setState] = useState({

        labels: [],
        datasets: [
            {
                label: '# of Votes',
                data: [],
                backgroundColor: [
                ],
                borderColor: [

                ],
                borderWidth: 1,
            },
        ],
    }
    );



    const dispatch = useDispatch()


    const { data, loading } = useSelector((state) => state.data);

    console.log(data);

    useEffect(() => {
        dispatch(getData(moment(from).format("MM/DD/YYYY"), moment(to).format("MM/DD/YYYY"), 1, null));
    }, [from, to]);




    useEffect(() => {
        if (data?.data) {
            setState({
                labels: data?.data && data?.data?.length > 0 ? data?.data?.map((item) => { return item.Country }) : [],
                datasets: [
                    {
                        label: 'Covid cases',
                        data: data?.data && data?.data?.length > 0 ? data?.data?.map((item) => { return item.TotalCases }) : [],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [data]);

    console.log(state);





    return (
        <>
            <Loader loading={loading} />
            <Stack direction="row" spacing={10} justifyContent="center" alignItems={"center"} sx={{ m: 4 }}>
                <TextField
                    value={from}
                    id="from"
                    type="date"
                    name="from"
                    label="From Date"
                    fullWidth
                    placeholder="From"
                    variant="outlined"
                    onChange={(e) => { setFrom(e.target.value) }}
                />

                <TextField
                    value={to}
                    id="to"
                    type="date"
                    name="to"
                    label="To Date"
                    fullWidth
                    placeholder="To"
                    variant="outlined"
                    onChange={(e) => { setTo(e.target.value) }}
                />


            </Stack>
            {state?.labels && <Box sx={{ height: "50vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Pie
                    data={state}
                    options={{
                        maintainAspectRatio: false,

                        plugins: {
                            tooltip: {
                                enabled: true,
                                callbacks: {
                                    footer: (ttItem) => {
                                        let sum = 0;
                                        let dataArr = ttItem[0].dataset.data;
                                        dataArr.map(data => {
                                            sum += Number(data);
                                        });

                                        let percentage = (ttItem[0].parsed * 100 / sum).toFixed(2) + '%';
                                        return `Percentage of data: ${percentage}`;
                                    }
                                }
                            },
                            /** Imported from a question linked above. 
                                Apparently Works for ChartJS V2 **/
                            datalabels: {
                                formatter: (value, dnct1) => {
                                    let sum = 0;
                                    let dataArr = dnct1.chart.data.datasets[0].data;
                                    dataArr.map(data => {
                                        sum += Number(data);
                                    });

                                    let percentage = (value * 100 / sum).toFixed(2) + '%';
                                    return percentage;
                                },
                                color: '#ff3',
                            }
                        }

                    }
                    }

                />
            </Box>}


        </>
    );
}
