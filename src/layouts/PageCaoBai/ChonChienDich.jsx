import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentIdCam, changeDataLang } from '../../component/reducer_action/BaseReducerAction';
import Select from 'react-select'

export default function ChonChienDich() {
  const dispatch = useDispatch()

  const [selectedOption, setSelectedOption] = useState({});
  const dataCam = useSelector(state => state.base.data_cam);
  const data_current_id_cam = useSelector(state => state.base.current_id_cam)

  const options = dataCam.map((item) => {
    return {
      id: item._id,
      value: item.campaign,
      label: item.campaign,
      campaign: item.campaign,
      language: item.language,
      check: item.check
    }
  })

  const handleChangeOption = () => {

    return setSelectedOption;
  }

  useEffect(() => {
    if (selectedOption.id) {
      dispatch(changeCurrentIdCam(selectedOption.id))

      let data_lang = { value: selectedOption.language, label: selectedOption.language }
      dispatch(changeDataLang([data_lang]))
      // setItemLocalStorage('id_cam', [id]);
    }

  }, [selectedOption])


  return (
    <Select className='col-8 o-campaigns'
      defaultValue={options.filter((item) => item.id === data_current_id_cam)}
      value={options.filter((item) => item.id === data_current_id_cam)}
      onChange={handleChangeOption()}
      options={options} />
  )

}