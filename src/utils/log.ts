import debug from "debug";

export default {
  log: debug("server:log"),
  warn: debug("server:warn"),
  error: debug("server:error"),
};
