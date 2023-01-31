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
    const current_id_cam = useSelector(state => state.base.current_id_cam)
    const [value_stop_ref, set_value_stop_ref, get_value_stop_ref] = useStateRef(
        'start'
    )

    const TestKeyGoogle = async () => {
        await getFirstKeyGg().then(async rs => {
            if (rs) {
                let response = getUrlByGoogle(1, 1, rs.key_api, 'xây dựng là gì?')
                if (response.status === 200) {
                    await ResetAllKeyGoogle().then(response => {
                        console.log(response.message);
                    })
                    await UpdateCountKeyGoogle(rs._id).then(response => {
                        console.log(response.message);
                    })
                }   
            }
        })
    }

    const TestKeyYoutube = async () => {
        await getFirstKeyYt().then(async rs => {
            if (rs) {
                let response = getUrlByYoutube(rs.key_api, 1, 'xây dựng là gì?')
                if (response.status === 200) {
                    await ResetAllKeyYoutube().then(response => {
                        console.log(response.message);
                    })
                    await UpdateCountKeyYoutube(rs._id).then(response => {
                        console.log(response.message);
                    })
                }   
            }
        })
    }

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

