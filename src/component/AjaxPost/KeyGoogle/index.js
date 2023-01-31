import { ajaxCallPost, ajaxCallPostNoR } from '../../AjaxPost';

export async function SaveKeyGoogle(arr) {
    let response = null
    await ajaxCallPost(`save-key-google`, arr).then(rs => {
        response = rs;
    })
    return response;
}


export async function deleteKeyGg(arr) {
    let response = null
    await ajaxCallPost('delete-key-google', arr).then(rs => {
        response = rs;
    })
    return response;
}

export async function deleteAllKeyGg() {
    let response = null
    await ajaxCallPostNoR(`delete-all-key-google`).then(rs => {
        response = rs;
    })
    return response;
}

export async function UpdateCountKeyGoogle(key_gg) {
    let response = null
    await ajaxCallPost(`update-count-key-google/${key_gg}`).then(rs => {
        response = rs;
    })
    return response;
}

export async function ResetAllKeyGoogle() {
    let response = null
    await ajaxCallPostNoR(`reset-all-key-google`).then(rs => {
        response = rs;
    })
    return response;
}

export async function getNextKeyGoogle(key) {
    let response = null
    await ajaxCallPostNoR(`get-next-key-google/${key}`).then(rs => {
        response = rs;
    })
    return response;
}
