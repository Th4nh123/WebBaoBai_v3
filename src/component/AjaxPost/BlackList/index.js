import { ajaxCallPost, ajaxCallPostNoR } from "../../AjaxPost";

export async function SaveBlackListByIdCam(current_id_cam, arr) {
    let response = null
    await ajaxCallPost(`save-black-list-by-id-cam/${current_id_cam}`, arr).then(rs => {
        response = rs;
    })
    return response;
}

export async function DeleteBlackKey(arr) {
    let response = null
    await ajaxCallPost('delete-black-list', arr).then(rs => {
        response = rs;
    })
    return response;
}

export async function DeleteAllBlackKey(current_id_cam) {
    let response = null
    await ajaxCallPostNoR(`delete-all-black-list/${current_id_cam}`).then(rs => {
        response = rs;
    })
    return response;
}