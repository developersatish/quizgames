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
    IsCorrect: boolean;
}

export interface SelectedAnswer {
    QID: string;
    SelectedQid: string;
    IsCorrect: boolean;
}

export interface Score {
    id: number,
    selectedAsnsers: SelectedAnswer[]
}

export interface TopUsers {
    yourRank: number,
    topUsers: {
        username: string,
        score: number
    }

}

const getAllQuestion = async (): Promise<any> => {
    const response = await apiRequest.get('/questions');
    return response.data;
};

const submitScore = async (score: Score): Promise<any> => {
    const response = await apiRequest.post('/quiz', score);
    return response.data;
};

const getTopUsers = async (id: number): Promise<any> => {
    const response = await apiRequest.get(`/quiz/${id}`);
    return response.data;
};

const getQuestionSummery = async (id: number): Promise<any> => {
    const response = await apiRequest.get(`/questions/${id}`);
    return response.data;
};

export { getAllQuestion, submitScore, getTopUsers, getQuestionSummery };
