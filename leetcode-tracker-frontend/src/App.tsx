import { useState } from 'react';
import Login from './components/Login';
import ProblemTable from './components/ProblemTable';

const App = () => {
    const [user, setUser] = useState<{ username: string; id: number } | null>(null);

    return (
        <div>
            {user ? (
                <>
                    <h1>Welcome back, {user.username}!</h1>
                    <ProblemTable userId={user.id} />
                </>
            ) : (
                <Login setUser={setUser} />
            )}
        </div>
    );
};

export default App;