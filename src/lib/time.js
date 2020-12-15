import moment from './moment'

const time = {
  getTimeText(hour) {
    let minute = Math.floor((hour - Math.floor(hour)) * 60);
    if (hour < 1) return minute + "'";
    if (minute < 1) return Math.floor(hour) + "h";
    return Math.floor(hour) + "h" + minute + "'";
  }
};

export default time;
