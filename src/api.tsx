import axios from 'axios';

export const getProfileInfo = async (login: string) => {
    const response = await axios.get('https://api.github.com/users/' + login);
    return response.data
}

export const getRepos = async (login: string) => {
    const response = await axios.get('https://api.github.com/users/' + login + '/repos');
    return response.data
}

