import { url } from './config';
import Cookies from 'js-cookie';

export const commentService = {
    addComment,
    getComments
};

/**
 * Send request for add comment
 * 
 * @param {Object} data 
 * @returns {Object}
 */
async function addComment(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Authorization' : 'Bearer' + ' ' + Cookies.get('token'),
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    };
    
    let res = await fetch(`${url}/api/auth/comments`, requestOptions)
    let comment =  await res.json()
    return comment;
}

/**
 * Get comments from server
 * 
 * @param {Object} 
 * @returns {Object}
 */
 async function getComments() {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    let res = await fetch(`${url}/api/comments`, requestOptions)
    let comments =  await res.json()
    return comments;
}