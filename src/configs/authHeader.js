import axios from 'axios';

const addAuthorizationHeader = () => {
    const token = localStorage.getItem('jwtToken'); // Or sessionStorage.getItem('jwtToken')

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
};
