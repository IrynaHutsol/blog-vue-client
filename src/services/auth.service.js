import Cookies from 'js-cookie';
import { url } from './config';

export const authService = {
    signup,
    login,
    logout,
    getMe
};

/**
 * Send request for signup
 * 
 * @param {Object} data 
 * @returns {Object}
 */
async function signup(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With' : 'XMLHttpRequest'
        },
        body: JSON.stringify(data)
    };
    let res = await fetch(`${url}/api/auth/signup`, requestOptions);
    let signup =  await res.json();
    return signup;
}

/**
 * Send request for login
 * 
 * @param {Object} data 
 * @returns {Object}
 */
async function login(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With' : 'XMLHttpRequest'
        },
        body: JSON.stringify(data)
    };
    let res = await fetch(`${url}/api/auth/login`, requestOptions);
    let login =  await res.json();
    return login;
}

/**
 * Send request for logout
 * 
 * @returns {Object}
 */
async function logout() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Authorization' : 'Bearer' + ' ' + Cookies.get('token')
        },
    };
    let res = await fetch(`${url}/api/auth/logout`, requestOptions);
    let logout =  await res.json();
    return logout;
}

/**
 * Get user
 * 
 * @returns {Object}
 */
async function getMe() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Authorization' : 'Bearer' + ' ' + Cookies.get('token')
        }
    };
    let res = await fetch(`${url}/api/auth/user`, requestOptions);
    let user =  await res.json();
    return user;
}