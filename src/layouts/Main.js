import React, { useEffect, useState } from 'react'
import '../css/style.css'
import { useDispatch, useSelector } from 'react-redux'
import { ajaxCallGet, getItemLocalStorage } from '../component/libs/base'
import { changeTrangThaiCam } from '../component/reducer_action/BaseReducerAction'
import Header from '../component/base/Header'
import Body from '../component/base/Body'
import Footer from '../component/base/Footer'
import '../css/style_fast_content.css'

export default function Main() {

  // const data_current_id_cam = useSelector(state => state.base.current_id_cam)
  // let id_cam = getItemLocalStorage('id_cam')[0];

  // 
  const dispatch = useDispatch();
  const dataCam = useSelector(state => state.base.data_cam);
  const data_current_id_cam = useSelector(state => state.base.current_id_cam);

  // useEffect(() => {
  window.onbeforeunload = function async(event) {
    event = event || window.event;

    var confirmClose = 'Are you sure?';
    console.log(event.returnValue)

    // For IE and Firefox prior to version 4
    if (event) {
      ajaxCallGet(`reset-cam/${data_current_id_cam}`).then(rs => {
        console.log('thanh cong')
        dispatch(changeTrangThaiCam(false))
      })
      // .catch(err => console.log(err))
      event.returnValue = confirmClose;
    }

    // For Safari
    return confirmClose;
  }

  // }, [])


  const handleGetCampaign = () => {
    let current_cam = dataCam.filter(item => {
      return item.id === data_current_id_cam;
    })

    if (current_cam.length !== 0) {
      document.title = current_cam[0].campaign;
    }
  }

  useEffect(() => {
    handleGetCampaign();
  }, [data_current_id_cam])

  return (
    <React.Fragment>
      <Header/>
      <Body/>
      <Footer />
    </React.Fragment >
  )
}