import axios from "axios";
import {apiUrl} from "../assets/js/config.js";
import {userInfo} from "../Store/userInfo.js";
import {projectReviewsStore} from "../Store/projectReviews.js";

export function getReviews(options) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };
    let link = '?'
    if (options) {
        for (let option in options) {
            link += `${option}=${options[option]}&`
        }
    }
    link = link.slice(0, -1)
    return axios.get(`${apiUrl}reviews${link}`, {headers}).then(result => {

        for (let review of result.data.reviews) {
            projectReviewsStore.reviews.push(review)
        }

    }).catch(error => error)

}


export async function addReview(review) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };



    return await axios.post(`${apiUrl}reviews`, review, {headers})
        .then(result => {

        }).catch(error => error)
}


export function showNotReviewed() {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    return axios.get(`${apiUrl}reviews?showNotReviewed=true`, {headers})
}

export async function editReview(review) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };

    return await axios.put(`${apiUrl}reviews/${review.id}`, review, {headers})
        .then(result => {
            const review = projectReviewsStore.reviews.find(item => item.id === result.data.updatedReview.id)
            review.comment = result.data.updatedReview.comment
            review.rating = result.data.updatedReview.rating
        }).catch(error => error)
}

export async function deleteReview(review) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };


    return await axios.delete(`${apiUrl}reviews/${review.id}`, {headers})
        .then(result => {
            projectReviewsStore.reviews.splice(projectReviewsStore.reviews.findIndex(item => item.id === review.id))
        }).catch(error => error)
}

export async function approveReview(review) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };
    review.isReviewed = true

    return await axios.put(`${apiUrl}reviews/${review.id}`, review, {headers})
        .then(result => result).catch(error => error)
}

export async function disapproveReview(review) {
    const headers = {
        'Authorization': `Bearer ${userInfo.token}`
    };
    review.isReviewed = false

    return await axios.put(`${apiUrl}reviews/${review.id}`, review, {headers})
        .then(result => result).catch(error => error)
}