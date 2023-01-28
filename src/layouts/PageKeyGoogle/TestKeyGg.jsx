import React from 'react'
import $ from "jquery";
import { useSelector } from 'react-redux';
import { getUrlByGoogle } from "../../component/AjaxGet";
import { UpdateCountKeyGoogle } from "../../component/AjaxPost/KeyGoogle";
const TestKeyGg = (props) => {

    const { handleGetAllKeyGg } = props
    const data_key_google = useSelector(state => state.base.data_key_google)

    const handleTestKeyGoogle = async () => {
        if (data_key_google.length > 0) {
            data_key_google.map(async item => {
                await getUrlByGoogle(1, 1, item.key_api, 'xây dựng là gì?').then(async (response) => {
                    if (response.status === 200) {
                        $(`.google-item-${item._id}`).css("background-color", "green");
                    } else if (response.status === 429) {
                        $(`.google-item-${item._id}`).css("background-color", "orange");
                    }
                    else {
                        $(`.google-item-${item._id}`).css("background-color", "red");
                    }
                    await UpdateCountKeyGoogle(item._id);
                    await handleGetAllKeyGg();
                })
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