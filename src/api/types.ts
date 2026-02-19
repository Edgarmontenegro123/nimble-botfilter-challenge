export type Candidate = {
    uuid: string;
    candidateId: string;
    applicationId: string;
    firstName: string;
    surName: string;
    email: string;
}

export type  Job = {
    id: string;
    title: string;
}

export type ApplyToJobBody = {
    uuid: string;
    jobId: string;
    candidateId: string;
    applicationId: string;
    repoUrl: string;
}

export type ApplyToJobResponse = {
    ok: boolean;
}