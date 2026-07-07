import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import {Box, Button, TextField, Typography, Card , CardContent} from "@mui/material";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    } else {
      console.log("Login successful:", data.user);
      login(data.user);
      navigate("/movies/favourites");
    }
  };
  
  return (
    <Box
    sx={{
      minHeight: "70vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      px: 2,
    }}
    >
    <Card sx={{ width: "100%", maxWidth: 420 }}>
    <CardContent>
    <Typography variant="h4" component="h1" gutterBottom>
    Login
    </Typography>
    
    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
    Sign in to access your favourites.
    </Typography>
    
    <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
    Don't have an account?{" "}
    <Link to="/signup">Sign Up</Link>
    </Typography>
    
    <TextField
    label="Email"
    type="email"
    fullWidth
    margin="normal"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />
    
    <TextField
    label="Password"
    type="password"
    fullWidth
    margin="normal"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />
    
    <Button
    variant="contained"
    fullWidth
    sx={{ mt: 3 }}
    onClick={handleLogin}
    >
    Login
    </Button>
    </CardContent>
    </Card>
    </Box>
  );
};

export default LoginPage;