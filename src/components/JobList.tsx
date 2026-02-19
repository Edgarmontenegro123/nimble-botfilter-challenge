import {JobItem} from './JobItem.tsx';
import type {Job} from '../api/types.ts';

type Props = {
    jobs: Job[];
};

export const JobList = ({ jobs }: Props) => {
    return (
        <div style = {{display: 'grid', gap: 12}}>
            {jobs.map((job: Job) => (
                <JobItem key={job.id} job={job} />
            ))}
        </div>
    );
};