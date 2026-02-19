import {JobItem} from './JobItem.tsx';
import type {Candidate, Job} from '../api/types.ts';

type Props = {
    jobs: Job[];
    candidate: Pick<Candidate, 'uuid' | 'candidateId' | 'applicationId'>
};

export const JobList = ({ jobs, candidate }: Props) => {
    return (
        <div className = 'jobsGrid'>
            {jobs.map((job: Job) => (
                <JobItem key = {job.id} job = {job} candidate = {candidate}/>
            ))}
        </div>
    );
};