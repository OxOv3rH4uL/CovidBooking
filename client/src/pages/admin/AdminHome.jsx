import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, styled } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const AdminHomePage = () => {
  const navigate = useNavigate(); 
  const [centreDetails, setCentreDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/admin')
      .then(res => {
        setCentreDetails(res.data);
        
      })
      .catch(err => {
        setError(err.message);
        alert(`Internal Server Error: ${err}`);
        navigate('/');
      });
  }, []);

  const handleUpdate = (id) => {
    localStorage.setItem('up_id',id);
    navigate('/update_centre');
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete_centre/${id}`)
    .then(res => {
      if(res.status === 200 && res.data === "Deleted Successfully!"){
        alert("Deleted Successfully!");
        axios.get('http://localhost:3001/admin')
        .then(res => {
          setCentreDetails(res.data);
          
        })
        .catch(err => {
          setError(err.message);
        });

      }
    })
  };

  

  return (
    <div className="container mx-auto">
        <div className='flex justify-between pt-5 px-5 py-5'>
            <h1 className="text-3xl font-bold mb-6">All Centres</h1>
            <a href="/create_centre" className="mr-4 px-6 py-3 bg-black text-white text-black font-semibold rounded-md">ADD CENTRE</a>
        </div>

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
            {centreDetails.map((centre) => (
              <TableRow key={centre.id}>
                <TableCell className="w-1/5">{centre.id}</TableCell>
                <TableCell className="w-1/5">{centre.centre_name}</TableCell>
                <TableCell className="w-1/5">{centre.city}</TableCell>
                <TableCell className="w-1/5">{centre.slots}</TableCell>
                <TableCell className="w-1/5 space-x-2">
                  <Button variant="contained" color="primary" onClick={() => handleUpdate(centre.id)}>Update</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(centre.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminHomePage;
