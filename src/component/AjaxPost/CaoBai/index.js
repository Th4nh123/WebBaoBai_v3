import { ajaxCallPost, ajaxCallPostNoR } from '../../AjaxPost';

export async function SaveVideo( arr) {
    let response = null
    await ajaxCallPost(`save-video`, arr).then(rs => {
        response = rs;
    })
    return response;
}

export async function SaveWeb( arr) {
    let response = null
    await ajaxCallPost(`save-web`, arr).then(rs => {
        response = rs;
    })
    return response;
}

export async function SaveImage( arr) {
    let response = null
    await ajaxCallPost(`save-image`, arr).then(rs => {
        response = rs;
    })
    return response;
}

export async function SaveFile( arr) {
    let response = null
    await ajaxCallPost(`save-file`, arr).then(rs => {
        response = rs;
    })
    return response;
}

export async function UpdateViTri(key) {
    let response = null
    await ajaxCallPostNoR(`update-vi-tri/${key}`).then(rs => {
        response = rs;
    })
    return response;
}
