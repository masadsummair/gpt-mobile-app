function setAlert(state, {payload}) {
  console.log(payload)
  state.alert = true;
  state.alertMessage = payload.message;
  state.mode = payload.mode?payload.mode:"danger";
}
function AlertOff(state,) {
  state.alert = false;
  state.alertMessage = 'Something went wrong!';
  state.mode = 'danger';
}

const appActions = {
  setAlert,
  AlertOff,
};

export default appActions;
