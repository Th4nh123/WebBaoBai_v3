import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react';

import '../../css/style.css'
import NhapExcel from '../../layouts/PageQLKey/NhapExcel'
import XoaKey from '../../layouts/PageQLKey/XoaKey'
import DanhSachKey from '../../layouts/PageQLKey/DanhSachKey'
import { changeDataKey } from '../../component/reducer_action/BaseReducerAction'
import { getKey,getKeyByIdCam } from '../AjaxGet'

export default function PageQLKeyNew() {
    const dispatch = useDispatch()

    const data_current_id_cam = useSelector(state => state.base.current_id_cam);

    const handleGetKeyByIdCam = async (id_cam) => {
        getKeyByIdCam(id_cam).then(arr => {
            dispatch(changeDataKey([...arr]))
        })
    }

    useEffect(() => {
        if (data_current_id_cam) {
            handleGetKeyByIdCam(data_current_id_cam)
        } else {
            dispatch(changeDataKey([]))
        }

    }, [data_current_id_cam])

    return (
        <div style={{ height: '77vh', width: '100%', margin: 'auto', border: '1px solid #ccc', borderRadius: '5px', padding: '8px', overflow: 'auto' }}>
            <div className='right-container position-relative'>
                <div
                    className='row px-4 d-flex align-items-center justify-content-between position-sticky'
                    style={{ top: '0', padding: '10px', background: '#fff' }}
                >
                    <div className='col-9'>
                        <span className='fs-7 fw-bolder'>Danh sách key:  </span>
                        <a href='#' className='mr-2'>

                        </a>
                    </div>
                    <div className='col-3 d-flex flex-row justify-content-end'>
                        <div className='col-4 delete'>
                            {data_current_id_cam && <NhapExcel handleGetKeyByIdCam={handleGetKeyByIdCam} />}
                        </div>
                        <div className='col-4 delete'>
                            {data_current_id_cam && <XoaKey handleGetKeyByIdCam={handleGetKeyByIdCam} />}
                        </div>
                    </div>
                </div>
                <div className='p-3 '>
                    <DanhSachKey />
                </div>
            </div>
        </div>

    )
}

