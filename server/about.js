let ABOUT_MESSAGE = "Hello World";
const getAbout = () => ABOUT_MESSAGE;
const setAboutMessage = (_, { message }) => {
  ABOUT_MESSAGE = message;
  return ABOUT_MESSAGE;
};

module.exports = {
  getAbout,
  setAboutMessage,
};
