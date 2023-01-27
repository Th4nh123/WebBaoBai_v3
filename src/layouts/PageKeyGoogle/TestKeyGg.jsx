import React from 'react'
import $ from 'jquery'
import { useSelector } from 'react-redux';
import { ajaxCallGet, CX_SEARCH, LINK_SEARCH } from '../../component/AjaxGet'

const TestKeyGg = (props) => {

    const { handleGetAllKeyGg } = props
    const data_key_google = useSelector(state => state.base.data_key_google)

    const UpdateCountKeyGoogle = async (key) => {

        await ajaxCallGet(`update-count-key-google/${key}`).then(response => {
            console.log(response.message);
        })
        // .catch(err => console.log(err))
    }

    async function getUrlByGoogle(start, count, key_api, key_search, id_key) {
        $.ajax({
            headers: {
            },
            type: 'GET',
            contentType: 'application/json',
            url: `${LINK_SEARCH}key=${key_api}&cx=${CX_SEARCH}&start=${start}&num=${count}&safe=active&q=${key_search}`,
            success: function (response, status, jqXHR) {
                // status : success
                // jqXHR.status : 200
                if (jqXHR.status === 200) {
                    UpdateCountKeyGoogle(id_key);
                    $(`.google-item-${id_key}`).css("background-color", "green");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // textStatus : error
                // jqXHR.status : 0
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
        return 11;
    }

    const handleTestKeyGoogle = async () => {
        if (data_key_google.length > 0) {
            data_key_google.map(item => {
                getUrlByGoogle(1, 1, item.key_api, 'xây dựng là gì?', item._id)
            })
        }
        // handleGetAllKeyGg()
    }

    return (
        <button type="button" className="btn btn-primary fw-bolder" style={{ fontSize: '14px' }} onClick={() => handleTestKeyGoogle()}>
            Test Key
        </button>
    )
}

export default TestKeyGg