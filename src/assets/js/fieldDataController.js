import {uploadImage} from "./controllers/imageUploader.js";

export function checkInputData (min, max, data, fieldName) {

    if (data) {
        if (data.length > max) {
            return `${fieldName} должно быть не больше ${max} символов.`
        } else if (data.length < min) {
            return `${fieldName} должно содержать минимум ${min} символов.`
        } else {
            return true
        }
    } else {
        return `${fieldName} должно быть не больше ${max} символов.`
    }



}

export function checkFileData (file) {

    let errors = {}

    if (file === undefined) {
        errors.emptyFile = `файл не загружен, пожалуйста загрузите изображение`
    } else {
        delete errors.emptyFile

        file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/webp' ?
            errors.fileType = `неверный формат изображения, разрешенные форматы: jpeg, jpg, png, gif, webp` :
            delete errors.fileType

        parseInt(file.size) > 5200000 ?
            errors.fileSize = `файл слишком большой, разрешается загружать файлы до 5мб` :
            delete errors.fileSize
    }


    if (errors) { return errors } else {  return true }

}