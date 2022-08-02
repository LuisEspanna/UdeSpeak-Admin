const moment = require ('moment');

const getUserDataFromResult = (userResult) => {
  let user = {
    displayName: `${userResult?.displayName}`,
    email: `${userResult?.email}`,
    photoURL: `${userResult?.photoURL}`,
    uid: `${userResult?.uid}`
  }

  if (userResult?.uid)
    user.isLogged = true;

  return user;
}


const toDateFormat = (date) => {
  return moment(date).format('DD/MM/YYYY h:mm a').toString();
}

const toISOFormat = (date) => {
  return moment(date).format().toString();
}

module.exports = {
  getUserDataFromResult,
  toDateFormat,
  toISOFormat
}