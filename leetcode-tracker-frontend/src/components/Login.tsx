import { useState } from 'react';
import axios from 'axios';

const Login = ({ setUsername }: { setUsername: (username: string) => void }) => {
    // State variables for username and password
    const [username, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle login
    const handleLogin = async () => {
        try {
            // Send POST request to login endpoint
            const response = await axios.post('http://localhost:8080/auth/login', { username, password });
            // If login is successful, update the username in the parent component
            if (response.data === 'Login Successful') {
                setUsername(username);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            {/* Input field for username */}
            <input 
                type="text" 
                placeholder="Username" 
                onChange={(e) => setUsernameInput(e.target.value)} 
            />
            {/* Input field for password */}
            <input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)} 
            />
            {/* Button to trigger login */}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;