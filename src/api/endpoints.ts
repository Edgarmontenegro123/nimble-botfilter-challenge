import {fetchJson} from './client.ts';
import type { ApplyToJobResponse, ApplyToJobBody, Candidate, Job } from './types';

export const getCandidateByEmail = (email: string) => {
    const qs = new URLSearchParams({email});
    return fetchJson<Candidate>(`/api/candidate/get-by-email?${qs.toString()}`);
};

export const getJobList = () => {
    return fetchJson<Job[]>('/api/jobs/get-list');
};

export const applyToJob = (body: ApplyToJobBody) => {
    return fetchJson<ApplyToJobResponse>('/api/candidate/apply-to-job', {
        method: 'POST',
        body: JSON.stringify(body),
    });
};