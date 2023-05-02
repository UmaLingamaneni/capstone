import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography, styled } from '@mui/material';
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
import { tableCellClasses } from '@mui/material/TableCell';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        }
    }));
    
export default function CountryTable() {

    const { defData, loading } = useSelector((state) => state.data);





    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDefaultData(`SELECT
        CASE 
            WHEN CHARINDEX('/', Location) > 0 AND CHARINDEX('/', Location, CHARINDEX('/', Location)+1) > 0 
            THEN SUBSTRING(Location, CHARINDEX('/', Location)+1, CHARINDEX('/', Location, CHARINDEX('/', Location)+1) - CHARINDEX('/', Location) - 1) 
            ELSE SUBSTRING(Location, CHARINDEX('/', Location)+1, LEN(Location)-1) 
        END AS Country, 
        COUNT(*) AS TotalCases
        FROM tempdata
        
        GROUP BY 
        CASE 
            WHEN CHARINDEX('/', Location) > 0 AND CHARINDEX('/', Location, CHARINDEX('/', Location)+1) > 0 
            THEN SUBSTRING(Location, CHARINDEX('/', Location)+1, CHARINDEX('/', Location, CHARINDEX('/', Location)+1) - CHARINDEX('/', Location) - 1) 
            ELSE SUBSTRING(Location, CHARINDEX('/', Location)+1, LEN(Location)-1)  
        END
        ORDER BY TotalCases DESC;
        `, "countrytable"));
    }, [dispatch]);


    console.log()


    return (
        <div>



                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell

                                    align={"left"}
                                >
                                    Country
                                </StyledTableCell>
                                <StyledTableCell

                                    align={"left"}
                                >
                                    Total Cases
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {defData?.countrytable?.data
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            <TableCell align="left">
                                                {row?.Country}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row?.TotalCases}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>


        </div>
    );
}
