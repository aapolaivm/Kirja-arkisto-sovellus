import React, { useState } from "react";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import TextField from '@mui/material/TextField';


const Login = () =>{

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleButtonClick = () =>{
        
    }

    return( 
    <div>
        <h1>Kirjaudu</h1>
        <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
        <Button component={Link} to ="/">Kirjaudu</Button>
    </div>)
    
}

export default Login;