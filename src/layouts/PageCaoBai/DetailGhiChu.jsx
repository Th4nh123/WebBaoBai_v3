import React from 'react'
import $ from 'jquery'
import { useSelector, useDispatch } from 'react-redux';

import { changeDataKey } from '../../component/reducer_action/BaseReducerAction';
import { getKeyByIdCam,getKeyNoneUrl } from '../../component/AjaxGet';
import { Const_Libs } from '../../component/Toast'

const DetailGhichu = () => {
    const dispatch = useDispatch();
    const data_current_id_cam = useSelector(state => state.base.current_id_cam)

    const handleGetKeyByIdCam = (id) => {
        getKeyByIdCam(id).then(rs => {
            $('.box-note-default').addClass('d-flex');
            $('.box-note-default').removeClass('d-none');
            $('.box-note-all').addClass('d-none');
            $('.box-note-all').removeClass('d-flex');
            dispatch(changeDataKey([...rs]));
        })
    }

    const handleGetKeyNoneUrl = async () => {
        if (data_current_id_cam) {
            Const_Libs.TOAST.success("Vui lòng đợi trong giây lát")
            await getKeyNoneUrl(data_current_id_cam).then(rs => {
                    console.log(rs);
                    if (rs.length === 0) {
                        Const_Libs.TOAST.success("Chiến dịch này đã có URL hết rồi")
                    } else {
                        $('.box-note-default').addClass('d-none');
                        $('.box-note-default').removeClass('d-flex');
                        $('.box-note-all').addClass('d-flex');
                        $('.box-note-all').removeClass('d-none');
                        dispatch(changeDataKey([...rs]))
                    }
                }).catch(err => console.log(err)).finally(() => {
                    Const_Libs.TOAST.success("Hoàn thành")
                })
        } else {
            Const_Libs.TOAST.error("Vui lòng chọn chiến dịch trước khi thao tác,")
        }
    }
    return (
        <ul className='d-flex justify-content-start align-items-center' style={{ marginTop: '16px', padding: 0 }}>
            <li className='d-none align-items-center me-3 box-note box-note-all' onClick={e => handleGetKeyByIdCam(data_current_id_cam)} style={{ cursor: 'pointer', border: '1px solid #2b94ff', background: '#a5d4ff61' }}><span className='box-color box-key-all' style={{ background: '#000' }}></span>Mặc định</li>
            <li className='d-flex align-items-center me-3 box-note box-note-default' onClick={e => handleGetKeyNoneUrl()} style={{ cursor: 'pointer' }}><span className='box-color box-default'></span>Mặc định</li>
            <li className='d-flex align-items-center me-3 box-note'><span className='box-color box-running'></span>Đang cào</li>
            <li className='d-flex align-items-center me-3 box-note'><span className='box-color box-finish'></span>Đã cào</li>
            <li className='d-flex align-items-center me-3 box-note'><span className='box-color box-choosing'></span>Đang chọn</li>
        </ul>
    )
}

export default DetailGhichu