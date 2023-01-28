import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { getAllKeyGg } from '../AjaxGet'

import { changeDataKeyGoogle } from '../reducer_action/BaseReducerAction'

import ModalAddKeyGoogle from '../modal/ModalAddKeyGoogle'

import DanhSachKeyGg from '../../layouts/PageKeyGoogle/DanhSachKeyGg'

import TestKeyGg from '../../layouts/PageKeyGoogle/TestKeyGg'

import ThemKeyGgExcel from '../../layouts/PageKeyGoogle/ThemKeyGgExcel'

import XoaKeyGg from '../../layouts/PageKeyGoogle/XoaKeyGg'

const PageQlKeyGoogle = () => {
    const dispatch = useDispatch();

    const handleGetAllKeyGg = () => {
        getAllKeyGg().then(arr => {
            dispatch(changeDataKeyGoogle([...arr]))
        })
    }

    useEffect(() => {
        handleGetAllKeyGg();
    }, [])

    return (
        <div style={{ height: '77vh', width: '900px', margin: 'auto', border: '1px solid #ccc', borderRadius: '5px', padding: '8px' }}>
            <div className='right-container position-relative'>
                <div
                    className='row px-4 d-flex align-items-center justify-content-between position-sticky'
                    style={{ top: '0', padding: '10px', background: '#fff' }}
                >
                    <div className='col-8'>
                        <span className='fs-7 fw-bolder'>Danh sách Key google: </span>
                        <a href='#' className='mr-2'>

                        </a>
                    </div>
                    <div className='col-4 d-flex flex-row justify-content-end'>
                        <div className='col-4 delete'>
                            <ThemKeyGgExcel handleGetAllKeyGg={handleGetAllKeyGg} />
                        </div>
                        <div className='col-4 delete'>
                            <ModalAddKeyGoogle handleGetAllKeyGg={handleGetAllKeyGg} />
                        </div>
                        <div className='col-4 delete'>
                            <TestKeyGg handleGetAllKeyGg={handleGetAllKeyGg} />
                        </div>
                        <div className='col-4 delete'>
                            <XoaKeyGg handleGetAllKeyGg={handleGetAllKeyGg} />
                        </div>
                    </div>
                </div>
                <div className='p-3 table-responsive'>
                    <DanhSachKeyGg />
                    <ul className='d-flex justify-content-center align-items-center' style={{ marginTop: '16px', padding: 0 }}>
                        <li className='d-flex align-items-center me-3 box-note'><span className='box-color box-running'></span>Đang cào</li>
                        <li className='d-flex align-items-center me-3 box-note'><span className='box-color box-finish'></span>Đã cào</li>
                        <li className='d-flex align-items-center me-3 box-note'><span className='box-color box-choosing'></span>Đang chọn</li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default PageQlKeyGoogle