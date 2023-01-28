import $ from "jquery";

export const URL_API = "http://localhost:8000/api/rd/xml/a/";

export const URL_WEB = "http://localhost:8000";

export const LINK_SEARCH = "https://www.googleapis.com/customsearch/v1?";

export const LINK_SEARCH_YOUTUBE = "https://youtube-v31.p.rapidapi.com/search?"

export const CX_SEARCH = "622357283d8f7426e";

const TOKENHEADER_VALUE = getCookie("Authorization");

// get cookie
function getCookie(name) {
    try {
        let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        if (match) {
            return match[2];
        } else {
            return "";
        }
    } catch (e) {
        return "";
    }
}

// Avoid Preflight request to reduce run time
// async - await : store valuable to outside function
async function ajaxCallGet(url) {
    var data_response = []
    url = url.concat('?token=' + TOKENHEADER_VALUE)
    await $.ajax({
        headers: {
        },
        type: 'GET',
        url: URL_API + url,
        success: function (response, status, jqXHR) {
            // status : success
            // jqXHR.status : 200
            data_response = response
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // textStatus : error
            // jqXHR.status : 0
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            $('.tab-content #main-error').html("Lỗi kết nối dữ liệu")
        }
    })
    return data_response;
}

export async function getUrlByGoogle(start, count, key_api, key_search, id_key) {
    let true_response = {
        data: '',
        status: ''
    }
    $.ajax({
        headers: {
        },
        type: 'GET',
        contentType: 'application/json',
        url: `${LINK_SEARCH}key=${key_api}&cx=${CX_SEARCH}&start=${start}&num=${count}&safe=active&q=${key_search}`,
        success: function (response, status, jqXHR) {
            // status : success
            // jqXHR.status : 200
            true_response.data = response;
            true_response.status = jqXHR.status;
            if (jqXHR.status === 200) {
                $(`.google-item-${id_key}`).css("background-color", "green");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // textStatus : error
            // jqXHR.status : 0
            true_response.status = jqXHR.status;
            if (jqXHR.status === 400 || jqXHR.status === 403) {
                $(`.google-item-${id_key}`).css("background-color", "red");
            } else if (jqXHR.status === 429) {
                $(`.google-item-${id_key}`).css("background-color", "orange");
            }
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    return true_response;
}

export function getUrlByYoutube(so_luong, KEY_API_SEARCH, id_key, key_search) {
    let true_response = {
        data: '',
        status: ''
    }
    $.ajax({
        headers: {
            "X-RapidAPI-Key": KEY_API_SEARCH,
            "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com"
        },
        type: 'GET',
        contentType: 'application/json',
        url: `${LINK_SEARCH_YOUTUBE}q=${key_search}&part=snippet,id&maxResults=${so_luong}&order=relevance&regionCode=VN`,
        success: function (response, status, jqXHR) {
            // status : success
            // jqXHR.status : 200
            true_response.data = response;
            true_response.status = jqXHR.status;
            if (jqXHR.status === 200) {

                $(`.youtube-item-${id_key}`).css("background-color", "green");
            } else if (jqXHR.status === 403) {
                $(`.youtube-item-${id_key}`).css("background-color", "red");
            } else if (jqXHR.status === 429) {
                $(`.youtube-item-${id_key}`).css("background-color", "orange");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // textStatus : error
            // jqXHR.status : 0
            true_response.status = jqXHR.status;
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    return true_response;
}

export const getCam = async () => {
    let data = [];
    await ajaxCallGet(`get-cam`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getBlackListByIdCam = async (current_id_cam) => {
    let data = null;
    ajaxCallGet(`get-black-list-by-id-cam/${current_id_cam}`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getKeyByIdCam = async (current_id_cam) => {
    let data = null
    ajaxCallGet('get-key-by-id-cam/' + current_id_cam).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getKey = async () => {
    let data = null
    ajaxCallGet('get-key').then(rs => {
        data = [...rs]
    })
    return data;
}

export const getAllKeyGg = async () => {
    let data = null
    ajaxCallGet(`get-all-key-google`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getAllKeyYt = async () => {
    let data = null
    ajaxCallGet(`get-all-key-youtube`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getFirstKeyYt = async () => {
    let data = null
    ajaxCallGet(`get-first-key-youtube`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getFirstKeyGg = async () => {
    let data = null
    ajaxCallGet(`get-first-key-google`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getUrlByIdKey = async (id_key) => {
    let data = null
    ajaxCallGet(`get-url-by-id-key/${id_key}`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getDataIdHaveGoogle = async (id_cam) => {
    let data = null
    ajaxCallGet(`get-data-id-have-url-google/${id_cam}`).then(rs => {
        data = [...rs]
    })
    return data;
}


export const getDataIdHaveVideo = async (id_cam) => {
    let data = null
    await ajaxCallGet(`get-data-id-have-video/${id_cam}`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getIdKey = async (current_id_cam) => {
    let data = null
    ajaxCallGet(`get-id-key/${current_id_cam}`).then( rs => {
        data = [...rs]
    })
    return data;
}
