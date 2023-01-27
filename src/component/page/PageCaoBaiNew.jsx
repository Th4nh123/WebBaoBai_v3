import React, { useEffect } from 'react'
import useStateRef from 'react-usestateref'
import { useSelector } from 'react-redux'

import './../../css/style.css'
import ModalPostContent from '../modal/ModalPostContent'
import PageCaoBaiLeft from '../../layouts/PageCaoBai/PageCaoBaiLeft'
import PageCaoBaiRight from '../../layouts/PageCaoBai/PageCaoBaiRight'
import DetailGhiChu from '../../layouts/PageCaoBai/DetailGhiChu'
import { ajaxCallGet, CX_SEARCH, LINK_SEARCH } from '../AjaxGet'
import { ajaxCallPostNoR, ajaxCallPost } from '../AjaxPost'
import axios from 'axios'

export default function PageCaoBaiNew() {
    const dataUrl = useSelector(state => state.base.data_url)
    const [value_stop_ref, set_value_stop_ref, get_value_stop_ref] = useStateRef(
        'start'
    )

    const [data_url_ref, set_data_url_ref, get_data_url_ref] = useStateRef('')

    const UpdateCountKeyGoogle = (KEY_API_SEARCH) => {
        ajaxCallPostNoR(`update-count-key-google/${KEY_API_SEARCH}`).then(response => {
            console.log(response)
        })
        // .catch(err => console.log(err))
    }

    const resetAllKeyGg = async () => {
        await ajaxCallPostNoR(`reset-all-key-google`).then(response => {
            console.log(response)
        })
        // .catch(err => console.log(err))
    }

    const UpdateCountKeyYoutube = (KEY_API_SEARCH) => {
        ajaxCallPostNoR(`update-count-key-youtube/${KEY_API_SEARCH}`).then(response => {
            console.log(response)
        })
        // .catch(err => console.log(err))
    }


    const resetAllKeyYt = async () => {
        await ajaxCallPostNoR(`reset-all-key-youtube`).then(response => {
            console.log(response)
        })
        // .catch(err => console.log(err))
    }


    const TestKeyGoogle = async () => {
        await ajaxCallGet(`get-first-key-google`).then(async rs => {
            if (rs) {
                let rs2 = await getUrlByGoogle(1, 1, rs[0].key_api, 'xây dựng là gì?')
                let rs3 = await getUrlByGoogle(1, 1, rs[0].key_api, 'xây dựng dân dụng là gì?')
                if (rs2.url && rs3.url) {
                    await resetAllKeyGg();
                    await UpdateCountKeyGoogle(rs[0].key_api);
                }
            }
        })
        // .catch(err => console.log(err))
    }

    const TestKeyYoutube = async () => {
        await ajaxCallGet(`get-first-key-youtube`).then(async rs => {
            if (rs) {
                let rs2 = await getUrlByYoutube(rs[0].key_api, 1, 'xây dựng là gì?')
                // console.log(rs2);
                if (Boolean(rs2) === true) {
                    await resetAllKeyYt();
                    await UpdateCountKeyYoutube(rs[0].key_api);
                }
            }
        })
        // .catch(err => console.log(err))
    }

    async function getUrlByYoutube(KEY_API_SEARCH, so_luong, key_search) {
        let result;
        const options = {
            method: 'GET',
            url: 'https://youtube-v31.p.rapidapi.com/search',
            params: {
                q: key_search,
                part: 'snippet,id',
                maxResults: so_luong,
                order: 'viewCount'
            },
            headers: {
                'X-RapidAPI-Key': KEY_API_SEARCH,
                'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
            }
        };

        await axios.request(options).then(async function (response) {
            // console.log(response);
            if (response.status === 200) {
                // console.log("KEY IN 200 API: ", KEY_API_SEARCH)
                await UpdateCountKeyYoutube(KEY_API_SEARCH);
                result = [...response.data.items]
            }
        }).catch(function (error) {
            console.error(error);
        });
        return result;
    }

    async function getUrlByGoogle(start, count, key_api, key_search) {
        let result;
        await fetch(`${LINK_SEARCH}key=${key_api}&cx=${CX_SEARCH}&start=${start}&num=${count}&safe=active&q=${key_search}`).then(response => response.json())
            .then(async rs => {
                result = rs;
            })
        // .catch(err => console.log(err))
        return result;
    }


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

