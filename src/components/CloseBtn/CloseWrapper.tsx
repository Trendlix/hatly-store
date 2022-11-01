import React , {FC} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch} from 'react-redux'
import { closeSidebar } from '../../features/sidebar/sidebar-slice';

const CloseWrapper: FC = props => {
  const dispatch = useDispatch();
  const closeSidebarHandler = ():void =>{
    dispatch(closeSidebar());
  }
  return (
    <div className="flex items-center justify-end p-5">
      <span onClick={closeSidebarHandler} className="flex justify-center p-2 rounded-[50%] cursor-pointer hover:bg-[hsla(0,0%,0%,.05)]">
        <CloseIcon />
      </span>
    </div>
  )
}

export default CloseWrapper