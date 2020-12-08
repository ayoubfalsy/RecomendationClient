/**
 * Created with Intellij IDEA
 * @User : Abdellatif
 * @Date : 10/10/2019
 * @Time : 10:50 AM
 *
 **/

export const validateString = (strName) => {
  try {
    // const pattern = "^\\w+$";
    const pattern = "^[a-zA-Z0-9 _-]+$";
    if (strName.trim() !== "") {
      if (strName.match(pattern)) {
        return true;
      }
    }
    return false;
  }
  catch (error) {
    console.log("error", error)
  }
};

export const validateEmail = (strName) => {
  try {
    // const pattern = "^\\w+$";
    const pattern = "^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?.)+(?:[a-zA-Z]{2}|aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel)$";
    if (strName.trim() !== "") {
      if (strName.match(pattern)) {
        return false;
      }else{
        return true
      }
    }
    return true;
  }
  catch (error) {
    console.log("error", error)
  }
};

// accept alphanumeric with special characters
export const validatAlphaNum = (strName) => {
  try {
    const pattern = "((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{8,20})";
    if (strName.trim() !== "") {
      if (strName.match(pattern)) {
        return true;
      }
    }
    return false;
  }
  catch (error) {
    console.log("error", error)
  }
};
