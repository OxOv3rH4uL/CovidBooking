import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, Button, Modal, Backdrop, Fade, TextField, Grid } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { Link } from 'react-router-dom';
import './Centres.css'; 

function Centres() {
    const [centreDetails, setCentreDetails] = useState([]);
    const [selectedCentre, setSelectedCentre] = useState(null);
    const [open, setOpen] = useState(false);
    const [slotTimings, setSlotTimings] = useState('');
    const [date, setDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(res => {
                setCentreDetails(res.data);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
            });
    }, []);

    const handleOpen = (centre) => {
        setSelectedCentre(centre);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBook = () => {
        const id = localStorage.getItem('id');
        axios.post(`http://localhost:3001/book/${id}/${selectedCentre.centre_name}/${selectedCentre.city}/${slotTimings}/${date}`)
            .then(res => {
                if (res.status === 200 && res.data === "Booked Successfully!") {
                    alert("Booked Successfully!");
                    setOpen(false);
                    axios.get('http://localhost:3001')
                        .then(res => {
                            setCentreDetails(res.data);
                        })
                        .catch(err => {
                            console.error(`Error: ${err}`);
                        });
                } else if(res.status === 200 && res.data === "Already Booked a Centre"){
                    alert("Already Booked");
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleSearch = () => {
        axios.get(`http://localhost:3001/search/${searchQuery}`)
            .then(res => {
                console.log(res);
                setCentreDetails(res.data);
            })
            .catch(err => {
                console.error("Error searching:", err);
            });
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    return (
        <div>
            <div className="flex justify-between pt-5 px-3">
                <a href='/centres' className="text-2xl text-black font-bold">AVAILABLE CENTRES(9AM-9PM)</a>
                <div className="flex justify-end">
                    <TextField
                        label="Search City"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button onClick={handleSearch} variant="contained" color="primary">
                        Search
                    </Button>
                </div>
                    <a href="/profile" className="mr-4 px-6 py-3 bg-black text-white text-black font-semibold rounded-md">PROFILE</a>
            </div>

            <div className="pt-10">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>Centre Name</StyledTableCell>
                                <StyledTableCell>City</StyledTableCell>
                                <StyledTableCell>Slots</StyledTableCell>
                                <StyledTableCell>Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {centreDetails.map((centre, index) => (
                                <TableRow key={index}>
                                    <TableCell>{centre.id}</TableCell>
                                    <TableCell>{centre.centre_name}</TableCell>
                                    <TableCell>{centre.city}</TableCell>
                                    <TableCell>{centre.slots}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => handleOpen(centre)}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Book
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className="modal-paper">
                        <h2 id="transition-modal-title"></h2>
                        <TextField
                            label="Slot Timings"
                            variant="outlined"
                            value={slotTimings}
                            onChange={(e) => setSlotTimings(e.target.value)}
                        />
                        <TextField
                            type="date"
                            variant="outlined"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <div className="modal-button-container">
                            <Button onClick={handleBook} variant="contained" color="primary">
                                Confirm
                            </Button>
                            <Button onClick={handleClose} variant="contained" color="secondary">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default Centres;
