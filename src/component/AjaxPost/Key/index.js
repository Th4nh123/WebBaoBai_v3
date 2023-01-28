import { ajaxCallPost, ajaxCallPostNoR } from '../../AjaxPost';

export async function SaveKeyByIdCam(data_current_id_cam, arr) {
    let response = null
    await ajaxCallPost(`save-key-by-id-cam/${data_current_id_cam}`, arr).then(rs => {
        response = rs;
    })
    return response;
}


export async function deleteKey(arr) {
    let response = null
    await ajaxCallPost('delete-key', arr).then(rs => {
        response = rs;
    })
    return response;
}

export async function deleteAllKey(data_current_id_cam) {
    let response = null
    await ajaxCallPostNoR(`delete-all-key/${data_current_id_cam}`).then(rs => {
        response = rs;
    })
    return response;
}