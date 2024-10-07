import axios from "axios";
import {api} from "@/API/apiurl.js";
import {userStore} from "@/Stores/userStore.js";

export function getReviews(options) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };
    let link = '?'
    if (options) {
        for (let option in options) {
            link += `${option}=${options[option]}&`
        }
    }
    link = link.slice(0, -1)
    return axios.get(`${api.url}reviews${link}`, {headers})

}


export async function addReview(review) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };

    return await axios.post(`${api.url}reviews`, review, {headers})
        .then(result => {

        }).catch(error => error)
}


export function showNotReviewed(options) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };
    let link = ''
    if (options) {
        for (let option in options) {
            link += `${option}=${options[option]}&`
        }
    }
    link = link.slice(0, -1)
    return axios.get(`${api.url}reviews?showNotReviewed=true&${link}`, {headers})
}

export async function editReview(review) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };

    return await axios.put(`${api.url}reviews/${review.id}`, review, {headers})
        .then(result => {
            const review = projectReviewsStore.reviews.find(item => item.id === result.data.updatedReview.id)
            review.comment = result.data.updatedReview.comment
            review.rating = result.data.updatedReview.rating
        }).catch(error => error)
}

export async function deleteReview(review) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };
    projectReviewsStore.reviews.splice(projectReviewsStore.reviews.findIndex(item => item.id === review.id), 1)
    return await axios.delete(`${api.url}reviews/${review.id}`, {headers})
        .then(result => result).catch(error => error)
}

export async function approveReview(review) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };
    review.isReviewed = true

    if (projectsStore.projects.find(item => item.id === review.ProjectId)) {
        projectsStore.projects.find(item => item.id === review.ProjectId).reviewsCount =  projectsStore.projects.find(item => item.id === review.ProjectId).reviewsCount + 1
    }
    return await axios.put(`${api.url}reviews/${review.id}`, review, {headers})
        .then(result => result).catch(error => error.response)
}

export async function disapproveReview(review) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };
    review.isReviewed = false

    return await axios.put(`${api.url}reviews/${review.id}`, review, {headers})
        .then(result => result).catch(error => error)
}