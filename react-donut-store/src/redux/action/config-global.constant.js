import { findAllConfigGlobal } from '../../main/util/api-caller';
import * as Helper from '../../share/common/helper/Helper';

export const FETCH_CONFIG_GLOBAL = 'FETCH_CONFIG_GLOBAL';

export const fetAllConfigGlobal = () => {
  return (dispatch) => {
    Helper.setLoading(true);
    return findAllConfigGlobal().then(({data}) => {
      dispatch(actFetchConfigGlobal(data));
      Helper.setLoading(false);
    }).catch(error => Helper.setLoading(false));
  }
}

const actFetchConfigGlobal = (listConfigGlobal) => {
  return {
    type : FETCH_CONFIG_GLOBAL,
    listConfigGlobal,
  }
}
