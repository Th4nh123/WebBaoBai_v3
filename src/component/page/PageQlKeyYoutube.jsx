import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux'

import { getAllKeyYt } from '../AjaxGet'

import { changeDataKeyYoutube } from '../reducer_action/BaseReducerAction'

import ModalAddKeyYoutube from '../modal/ModalAddKeyYoutube'

import DanhSachKeyYt from '../../layouts/PageKeyYoutube/DanhSachKeyYt'

import TestKeyYoutube from '../../layouts/PageKeyYoutube/TestKeyYoutube'

import ThemKeyYtExcel from '../../layouts/PageKeyYoutube/ThemKeyYtExcel'

import XoaKeyYt from '../../layouts/PageKeyYoutube/XoaKeyYt'

const PageQlKeyYoutube = () => {
    const dispatch = useDispatch();

    const handleGetAllKeyYt = async () => {
        await getAllKeyYt().then(arr => {
            dispatch(changeDataKeyYoutube([...arr]))
        })
    }

    useEffect(() => {
        handleGetAllKeyYt()
    }, [])


    return (
        <div style={{ height: '77vh', width: '900px', margin: 'auto', border: '1px solid #ccc', borderRadius: '5px', padding: '8px' }}>
            <div className='right-container position-relative'>
                <div
                    className='row px-4 d-flex align-items-center justify-content-between position-sticky'
                    style={{ top: '0', padding: '10px', background: '#fff' }}
                >
                    <div className='col-7'>
                        <span className='fs-7 fw-bolder'>Danh sách Key youtube: </span>
                        <a href='#' className='mr-2'>

                        </a>
                    </div>
                    <div className='col-5 d-flex flex-row justify-content-end'>
                        <div className='col-4 delete'>
                            <ThemKeyYtExcel handleGetAllKeyYt={handleGetAllKeyYt} />
                        </div>
                        <div className='col-3 delete'>
                            <ModalAddKeyYoutube handleGetAllKeyYt={handleGetAllKeyYt} />
                        </div>
                        <div className='col-5 delete'>
                            <TestKeyYoutube handleGetAllKeyYt={handleGetAllKeyYt} />
                        </div>
                        <div className='col-3 delete'>
                            <XoaKeyYt handleGetAllKeyYt={handleGetAllKeyYt} />
                        </div>
                    </div>
                </div>
                <div className='p-3 table-responsive'>
                    <DanhSachKeyYt />
                </div>
            </div>
        </div>
    )
}

export default PageQlKeyYoutube