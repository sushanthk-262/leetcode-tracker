import { useState } from 'react';
import ProblemTable from './components/ProblemTable';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loginToLeetCode } from './api/submissionService';

const queryClient = new QueryClient();

const App = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [searchUsername, setSearchUsername] = useState<string | null>(null);

    const handleLogin = async () => {
        await loginToLeetCode(username, password);
        setSearchUsername(username);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Login & Fetch Submissions</button>
                {searchUsername && <ProblemTable username={searchUsername} />}
            </div>
        </QueryClientProvider>
    );
};

export default App;
