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

export async function resetCam(id_cam) {
    let response = null
    await ajaxCallPostNoR(`reset-cam/${id_cam}`).then(rs => {
        response = rs;
    })
    return response;
}

export async function updateCam(id_cam) {
    let response = null
    await ajaxCallPostNoR(`update-cam/${id_cam}`).then(rs => {
        response = rs;
    })
    return response;
}