function WarningMsg(name) {
  const msg = {
    phone: "Please enter a valid phone number, e.g. 9994442222",
    pinCode: "Please enter a 6 digit pin",
  };

  return msg[name];
}

export { WarningMsg };
