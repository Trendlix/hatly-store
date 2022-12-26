import { useDispatch } from "react-redux";
import { sidebarActions } from "../redux/features/user/sidebarSlice";

const dispatch = useDispatch()
export const openSidebarHandler = ()=>{
  dispatch(sidebarActions.open())
}

