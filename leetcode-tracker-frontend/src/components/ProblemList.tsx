import { useQuery } from '@tanstack/react-query';
import { fetchProblems } from '../api/problemService';

type Problem = {
    id: number;
    title: string;
    difficulty: string;
};

const ProblemList = () => {
    const { data, error, isLoading } = useQuery<Problem[]>({
        queryKey: ['problems'],
        queryFn: fetchProblems
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching problems</p>;

    return (
        <ul>
            {data?.map((problem) => (
                <li key={problem.id}>
                    {problem.title} - {problem.difficulty}
                </li>
            ))}
        </ul>
    );
};

export default ProblemList;
