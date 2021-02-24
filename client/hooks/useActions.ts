import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import actions from "../store/actions";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
