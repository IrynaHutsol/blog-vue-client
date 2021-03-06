import { url } from './config';
import Cookies from 'js-cookie';

export const postService = {
    addPost
};

/**
 * Send request for add post
 * 
 * @param {Object} data 
 * @returns {Object}
 */
async function addPost(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Authorization' : 'Bearer' + ' ' + Cookies.get('token'),
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    };
    
    let res = await fetch(`${url}/api/auth/posts`, requestOptions)
    let post =  await res.json()
    return post;
}