import moment from "moment";

const dateFormat = {
  d1: (ISO8601String: string) => {
    return moment(ISO8601String).format("YYYY.MM.DD HH:mm");
  },
};

export default dateFormat;
