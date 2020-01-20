class HttpError extends Error {
  constructor(message, errorCode) {
    //Add a message property
    super(message);
    this.code = errorCode; // Adds a "code" property
  }
}

module.exports = HttpError;
