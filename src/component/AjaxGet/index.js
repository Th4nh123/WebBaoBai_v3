import $, { data } from "jquery";

export const URL_API = 'http://localhost:800/WebClone_V2-thanh/api/rd/xml/a/';

export const URL_WEB = 'http://localhost:800/WebClone_V2-thanh/';

export const LINK_SEARCH = "https://www.googleapis.com/customsearch/v1?";

export const LINK_SEARCH_YOUTUBE = "https://youtube-v31.p.rapidapi.com/search?"

export const LINK_PLAY_LIST_YOUTUBE = "https://youtube-v31.p.rapidapi.com/playlistItems?"

export const CX_SEARCH = "622357283d8f7426e";

const TOKENHEADER_VALUE = getCookie("Authorization");

export const KEY_API_TRANS = "AIzaSyAtvWiWUms7XR_NkzhFXFkLa4BM-5jUTdE";
// export const KEY_API_TRANS = 'c0eb40b476msh231059c886fccc4p171a55jsn86d44ff993aa'

export const getHostname = (url) => {
    let host_name = new URL(url).hostname;
    let arr = host_name.split(".");
    let result = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (result.length < arr[i].length) {
            result = arr[i];
        }
    }
    return result;
};

export const getHostname2 = (url) => {
    let arr = url.split(".");
    let result = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (result.length < arr[i].length) {
            result = arr[i];
        }
    }
    return result;
};

export function downloadFile(file) {
    const element = document.createElement("a");
    element.setAttribute("href", file);
    element.setAttribute("download", "jdjdj");
    element.setAttribute("target", "_blank");
    // element.style.display = 'none'
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

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

async function ajaxCallGet(url) {
    var data_response = []
    url = url.concat('?token=' + TOKENHEADER_VALUE)
    await $.ajax({
        headers: {
            // preflight response
            'content-type': 'application/json'
        },
        type: 'GET',
        url: URL_API + url,
        async: true,
        cache: false,
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

export function getUrlByGoogle(start, count, key_api, key_search, prefix) {
    let true_response = {
        data: '',
        status: ''
    }
    $.ajax({
        headers: {
            // preflight response
            'content-type': 'application/json'
        },
        type: 'GET',
        url: `${LINK_SEARCH}key=${key_api}&cx=${CX_SEARCH}&start=${start}&num=${count}&safe=active&q=${key_search}${prefix}`,
        async: false,
        cache: false,
        timeout: 30000,
        success: function (response, status, jqXHR) {
            // status : success
            // jqXHR.status : 200
            true_response.data = response;
            true_response.status = jqXHR.status;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // textStatus : error
            // jqXHR.status : 0
            true_response.data = textStatus;
            true_response.status = jqXHR.status;
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    console.log(true_response);
    return true_response;
}

export function getUrlByYoutube(so_luong, KEY_API_SEARCH, key_search) {
    let true_response = {
        data: '',
        status: ''
    }
    $.ajax({
        headers: {
            // preflight response
            'content-type': 'application/json',
            "X-RapidAPI-Key": KEY_API_SEARCH,
            "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com"
        },
        type: 'GET',
        url: `${LINK_SEARCH_YOUTUBE}q=${key_search}&part=snippet,id&maxResults=${so_luong}&order=relevance&regionCode=VN`,
        async: false,
        cache: false,
        success: function (response, status, jqXHR) {
            // status : success
            // jqXHR.status : 200
            true_response.data = response;
            true_response.status = jqXHR.status;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // textStatus : error
            // jqXHR.status : 0
            true_response.status = jqXHR.status;
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    console.log(true_response);
    return true_response;
}

export function getUrlYoutubeByIdPlayList(playlistId, KEY_API_SEARCH, so_luong) {
    let true_response = {
        data: '',
        status: ''
    }
    $.ajax({
        headers: {
            // preflight response
            'content-type': 'application/json',
            "X-RapidAPI-Key": KEY_API_SEARCH,
            "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com"
        },
        type: 'GET',
        url: `${LINK_PLAY_LIST_YOUTUBE}playlistId=${playlistId}&part=snippet&maxResults=${so_luong}`,
        async: false,
        cache: false,
        success: function (response, status, jqXHR) {
            // status : success
            // jqXHR.status : 200
            true_response.data = response;
            true_response.status = jqXHR.status;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // textStatus : error
            // jqXHR.status : 0
            true_response.status = jqXHR.status;
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })
    console.log(true_response);
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
    await ajaxCallGet(`get-black-list-by-id-cam/${current_id_cam}`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getKeyByIdCam = async (current_id_cam) => {
    let data = null
    await ajaxCallGet('get-key-by-id-cam/' + current_id_cam).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getKey = async () => {
    let data = null
    await ajaxCallGet('get-key').then(rs => {
        data = [...rs]
    })
    return data;
}

export const getAllKeyGg = async () => {
    let data = null
    await ajaxCallGet(`get-all-key-google`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getAllKeyYt = async () => {
    let data = null
    await ajaxCallGet(`get-all-key-youtube`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getFirstKeyYt = async () => {
    let data = null
    await ajaxCallGet(`get-first-key-youtube`).then(rs => {
        data = rs
    })
    return data;
}

export const getFirstKeyGg = async () => {
    let data = null
    await ajaxCallGet(`get-first-key-google`).then(rs => {
        data = rs
    })
    return data;
}

export const getUrlByIdKey = async (id_key) => {
    let data = null
    await ajaxCallGet(`get-url-by-id-key/${id_key}`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getUrlByIdKey2 = async (id_key) => {
    let data = null
    await ajaxCallGet(`get-url-by-id-key2/${id_key}`).then(rs => {
        data = [...rs]
    })
    return data;
}


export const getKeyWordHaveGoogle = async (id_cam) => {
    let data = null
    await ajaxCallGet(`get-data-id-have-url-google/${id_cam}`).then(rs => {
        data = [...rs]
    })
    return data;
}


export const getKeyWordHaveVideo = async (id_cam) => {
    let data = null
    await ajaxCallGet(`get-data-id-have-video/${id_cam}`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getOneKey = async (current_id_cam) => {
    let data = null
    await ajaxCallGet(`get-id-key/${current_id_cam}`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getKeyYoutube = async () => {
    let data = null
    await ajaxCallGet(`get-key-youtube`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getKeyGoogle = async () => {
    let data = null
    await ajaxCallGet(`get-key-google`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const findKey = async (name) => {
    let data = null
    await ajaxCallGet(`find-key/${name}`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getDetailPost = async (id_post) => {
    let data = null
    await ajaxCallGet(`get-detail-post/${id_post}`).then(rs => {
        data = [...rs]
    })
    return data;
}


export const getKeyNoneUrl = async (id_cam) => {
    let data = null
    await ajaxCallGet(`get-key-none-url/${id_cam}`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const findLikeUrl = async (id_cam) => {
    let data = null
    await ajaxCallGet(`find-like-url/${id_cam}`).then(rs => {
        data = [...rs]
    })
    return data;
}

export const getKyHieu = async (key) => {
    let data = null
    await ajaxCallGet(`get-ky-hieu/${key}`).then(rs => {
        data = rs
    })
    return data;
}
