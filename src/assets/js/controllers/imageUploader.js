import {useFetch} from "./requestsControl.js";

export function uploadImage(image) {
    const formData = new FormData();
    formData.append("image-upload", image );

    return useFetch('image-upload', "POST", formData)



}