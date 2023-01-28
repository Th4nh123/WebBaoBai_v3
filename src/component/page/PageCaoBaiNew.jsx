import React, { useEffect } from 'react'
import useStateRef from 'react-usestateref'
import { useSelector } from 'react-redux'

import './../../css/style.css'
import ModalPostContent from '../modal/ModalPostContent'
import PageCaoBaiLeft from '../../layouts/PageCaoBai/PageCaoBaiLeft'
import PageCaoBaiRight from '../../layouts/PageCaoBai/PageCaoBaiRight'
import DetailGhiChu from '../../layouts/PageCaoBai/DetailGhiChu'
import {
    getFirstKeyYt,
    getFirstKeyGg,
    getUrlByGoogle,
    getUrlByYoutube
} from '../AjaxGet'
import { UpdateCountKeyGoogle, ResetAllKeyGoogle } from "../AjaxPost/KeyGoogle";
import { UpdateCountKeyYoutube, ResetAllKeyYoutube } from "../AjaxPost/KeyYoutube";

export default function PageCaoBaiNew() {
    const dataUrl = useSelector(state => state.base.data_url)
    const [value_stop_ref, set_value_stop_ref, get_value_stop_ref] = useStateRef(
        'start'
    )

    const [data_url_ref, set_data_url_ref, get_data_url_ref] = useStateRef('')

    const TestKeyGoogle = async () => {
        // await getFirstKeyYt().then(async rs => {
        //     if (rs) {
        let rs2 = await getUrlByGoogle(1, 1, getFirstKeyGg().key_api, 'xây dựng là gì?')
        let rs3 = await getUrlByGoogle(1, 1, getFirstKeyGg().key_api, 'xây dựng dân dụng là gì?')
        if (rs2.url && rs3.url) {
            await ResetAllKeyGoogle();
            await UpdateCountKeyGoogle(getFirstKeyYt()._id);
        }
        // }
        // })
        // .catch(err => console.log(err))
    }

    const TestKeyYoutube = async () => {
        let rs2 = await getUrlByYoutube(getFirstKeyYt().key_api, 1, 'xây dựng là gì?')
        // console.log(rs2);
        if (Boolean(rs2) === true) {
            await ResetAllKeyYoutube();
            await UpdateCountKeyYoutube(getFirstKeyYt()._id);
        }
        // }
        // .catch(err => console.log(err))
    }

    // async function getUrlByYoutube(KEY_API_SEARCH, so_luong, key_search) {
    //     let result;
    //     const options = {
    //         method: 'GET',
    //         url: 'https://youtube-v31.p.rapidapi.com/search',
    //         params: {
    //             q: key_search,
    //             part: 'snippet,id',
    //             maxResults: so_luong,
    //             order: 'viewCount'
    //         },
    //         headers: {
    //             'X-RapidAPI-Key': KEY_API_SEARCH,
    //             'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    //         }
    //     };

    //     await axios.request(options).then(async function (response) {
    //         // console.log(response);
    //         if (response.status === 200) {
    //             // console.log("KEY IN 200 API: ", KEY_API_SEARCH)
    //             await UpdateCountKeyYoutube(KEY_API_SEARCH);
    //             result = [...response.data.items]
    //         }
    //     }).catch(function (error) {
    //         console.error(error);
    //     });
    //     return result;
    // }

    // async function getUrlByGoogle(start, count, key_api, key_search) {
    //     let result;
    //     await fetch(`${LINK_SEARCH}key=${key_api}&cx=${CX_SEARCH}&start=${start}&num=${count}&safe=active&q=${key_search}`).then(response => response.json())
    //         .then(async rs => {
    //             result = rs;
    //         })
    //     // .catch(err => console.log(err))
    //     return result;
    // }


    useEffect(() => {
        set_data_url_ref(dataUrl)
    }, [dataUrl])


    useEffect(() => {
        TestKeyGoogle();
        TestKeyYoutube();
    }, [])



    return (
        <React.Fragment>
            <ModalPostContent />
            <section id='content'>
                <div className='top-content'>
                    <div className='row justify-content-end'>
                    </div>
                </div>
                <div className='bottom-content'>
                    <div className='row '>
                        <PageCaoBaiLeft value_stop_ref={value_stop_ref} set_value_stop_ref={set_value_stop_ref} get_value_stop_ref={get_value_stop_ref} />
                        <PageCaoBaiRight value_stop_ref={value_stop_ref} set_value_stop_ref={set_value_stop_ref} get_value_stop_ref={get_value_stop_ref} />
                    </div>
                    <DetailGhiChu />
                </div>
            </section>
        </React.Fragment>
    )
}

