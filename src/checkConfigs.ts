export const checkConfigs = () => {
  if (!process.env.ACCESS_TOKEN_KEY) {
    throw "Specify ACCESS_TOKEN_KEY string in .env config file.";
  }
}

export default checkConfigs;
