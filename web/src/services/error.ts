import { ref } from "vue";

const hasSiteError = ref(false);
const errorCode = ref(0);

const errorMessages = [
  {
    code: 400,
    message1: "There was a problem communicating with the server.",
    message2: "Check with the site admin or contact the NOC",
    icon: "alert-circle",
  },
  {
    code: 403,
    message1: "Access to this application is restricted",
    message2: "Check with the site admin if you believe this is a mistake",
    icon: "lock",
  },
  {
    code: 404,
    message1: "The project could not be found",
    message2: " It may have been deleted or moved.",
    icon: "magnify-minus",
  },
];

window.onerror = function (msg, url, lineNo, columnNo, error) {
  if (error) {
    console.log("err", msg, url, lineNo, columnNo, error);
  }
};

export { hasSiteError, errorCode, errorMessages };
