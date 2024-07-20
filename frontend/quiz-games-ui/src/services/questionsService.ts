import apiRequest from './api';
import { apiClient } from './httpService';

export interface Question {
    QID: string;
    Question: string;
    Answer: string;
    A: string;
    B: string;
    C: string;
    D: string;
}

export interface Score {
    id: number,
    score: number
}
export interface TopUsers extends Score {
    username: string
}

const getAllQuestion = async (): Promise<any> => {
    const response = await apiRequest.get('/questions');
    return response.data;
};

const submitScore = async (score: Score): Promise<any> => {
    const response = await apiRequest.post('/quiz', score);
    return response.data;
};

const getTopUsers = async (): Promise<any> => {
    const response = await apiClient.get('/quiz');
    return response.data;
};

export { getAllQuestion, submitScore, getTopUsers };
