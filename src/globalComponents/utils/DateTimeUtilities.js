import moment from 'moment';

export const getMomentDateForma = (date) => {
    try {
        return moment(date).fromNow(true);
    } catch (e) {
        console.log(e);
    }
};

export const getUnixTime = (date) => {
    try {
        return moment(date).toDate().getTime();
    } catch (e) {
        console.log(e);
    }
};
export const getMomentDate = (date) => {
    try {
        return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    } catch (e) {
        console.log(e);
    }
};

