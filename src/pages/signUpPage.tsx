import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { AuthContext } from "../contexts/authContext";
import {Box, Button, TextField, Typography, Card , CardContent} from "@mui/material";
import { supabase } from "../supabaseClient";

const SignUpPage: React.FC = () => {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        
        if (error) {
            console.error("Sign up error:", error.message);
            alert("Sign up failed: " + error.message);
            return;
        }
        
        console.log("Sign up successful:", data.user);
        alert("Account created. Check your email if confirmation is required.");
        navigate("/login");
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
          Sign Up
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Create an account to access your favourites.
        </Typography>

        <form onSubmit={handleSignUp}>
          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            required
            inputProps={{ minLength: 8 }}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Sign Up
          </Button>
        </form>
      </CardContent>
    </Card>
  </Box>
);
};
export default SignUpPage;