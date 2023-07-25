import { IAppSlice, IAlert } from "../slices/AppSlice";



function setAlert(state: IAppSlice, { payload }: { payload: IAlert }) {

  state.alert = true;
  state.message = payload.message;
  state.mode = payload.mode ? payload.mode : "danger";
}
function AlertOff(state: IAppSlice) {
  state.alert = false;
  state.message = 'Something went wrong!';
  state.mode = 'danger';
}

const appActions = {
  setAlert,
  AlertOff,
};

export default appActions;
