import $ from 'jquery'

import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { getBlackListByIdCam } from '../AjaxGet';

import { changeDataBlackList } from '../reducer_action/BaseReducerAction';

import NhapExcel from '../../layouts/PageBlackList/NhapExcel';

import XoaBlackList from '../../layouts/PageBlackList/XoaBlackList';

import DanhSachBlackList from '../../layouts/PageBlackList/DanhSachBlackList';

import ModalAddBlackList from '../modal/ModalAddBlackList';

export default function PageBlacklistDomain() {
  const dispatch = useDispatch()

  const current_id_cam = useSelector(state => state.base.current_id_cam)

  const handleGetBlackListByIdCam = async (id_cam) => {
    getBlackListByIdCam(id_cam).then( arr => {
      dispatch(changeDataBlackList([...arr]))
    })
  }

  useEffect(() => {
    if (current_id_cam) {
      handleGetBlackListByIdCam(current_id_cam);
    } else {
      dispatch(changeDataBlackList([]))
    }

    $('#checkbox-all-black').click(function () {
      if ($(this).prop('checked')) {
        $('.btn-delete-all-bl').removeClass('d-none')
        $('.btn-delete-bl').addClass('d-none')

        $('input[name="checkbox-black-key"]').prop('checked', true);
      } else {
        $('.btn-delete-all-bl').addClass('d-none')
        $('.btn-delete-bl').removeClass('d-none')

        $('input[name="checkbox-black-key"]').prop('checked', false);
      }
    })

  }, [current_id_cam])

  return (
    <div style={{ height: '77vh', width: '70%', margin: 'auto', border: '1px solid #ccc', borderRadius: '5px', padding: '8px', overflow: 'auto' }}>
      <div className='right-container position-relative'>
        <div
          className='row px-4 d-flex align-items-center justify-content-between position-sticky'
          style={{ top: '0', padding: '10px', background: '#fff' }}
        >
          <div className='col-8'>
            <span className='fs-7 fw-bolder'>Danh sách blackList:  </span>
            <a href='#' className='mr-2'>
            </a>
          </div>
          <div className='col-4 d-flex flex-row justify-content-end'>
            <div className='col-4 delete'>
              {current_id_cam && <NhapExcel handleGetBlackListByIdCam={handleGetBlackListByIdCam}/>}
            </div>
            <div className='col-4 delete'>
              {current_id_cam && <ModalAddBlackList handleGetBlackListByIdCam={handleGetBlackListByIdCam} />}
            </div>
            <div className='col-4 delete'>
              {current_id_cam && <XoaBlackList handleGetBlackListByIdCam={handleGetBlackListByIdCam}/>}
            </div>

          </div>
        </div>
        <div className='p-3'>
          <DanhSachBlackList />
        </div>
      </div>
    </div>
  )
}
