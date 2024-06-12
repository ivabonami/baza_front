import {useFetch} from "./controllers/requestsControl.js";
import {modalSetting} from "./modal.js";
import {reactive} from "vue";

export function deleteProject(id) {
    useFetch(`projects/${id}`, 'DELETE')
}

export const editableProject = reactive({
    project: null,
})