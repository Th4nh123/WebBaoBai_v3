import { ajaxCallPost, ajaxCallPostNoR } from "../../AjaxPost";

export async function SaveCam(arr) {
    let response = null
    await ajaxCallPost(`save-cam`, arr).then(rs => {
        response = rs;
    });
    return response;
}

export async function DeleteCam(arr) {
    let response = null
    await ajaxCallPost('delete-campaign', arr).then(rs => {
        response = rs;
    })
    return response;
}

export async function DeleteAllCam() {
    let response = null
    await ajaxCallPostNoR('delete-all-campaign').then(rs => {
        response = rs;
    })
    return response;
}