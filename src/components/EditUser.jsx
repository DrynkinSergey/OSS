import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

const EditUser = () => {
    return (
        <div style={{display:'flex',
        flexDirection:'column'}}>
          <h1>Edit</h1>
            <Link to='/'><Button sx={{mb: 1,}} variant="contained" color="error">Back</Button></Link>

        </div>
    );
};

export default EditUser;
