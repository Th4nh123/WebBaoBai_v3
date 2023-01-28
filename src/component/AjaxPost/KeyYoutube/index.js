import { ajaxCallPost, ajaxCallPostNoR } from '../../AjaxPost';

export async function SaveKeyYoutube(arr) {
    let response = null
    await ajaxCallPost(`save-key-youtube`, arr).then(rs => {
        response = rs;
    })
    return response;
}


export async function deleteKeyYt(arr) {
    let response = null
    await ajaxCallPost(`delete-key-youtube`, arr).then(rs=> {
        response = rs;
    })
    return response;
}

export async function deleteAllKeyYt() {
    let response = null
    await ajaxCallPostNoR(`delete-all-key-youtube`).then(rs => {
        response = rs;
    })
    return response;
}

export async function UpdateCountKeyYoutube(key_yt) {
    await ajaxCallPostNoR(`update-count-key-youtube/${key_yt}`).then(rs => {
        console.log(rs.message);
    })
}

export async function ResetAllKeyYoutube() {
    await ajaxCallPostNoR(`reset-all-key-youtube`).then(rs => {
        console.log(rs.message);
    })
}
