import moment from "moment";

const dateFormat = {
  d1: (ISO8601String: string) => {
    const current = moment();

    const durationObject = moment.duration(current.diff(ISO8601String));

    if (durationObject.asYears() > 1) {
      const durationYear = Math.round(durationObject.asYears());

      // year
      if (durationYear === 1) {
        return "a year ago";
      } else {
        return `${durationYear} years ago`;
      }
    }

    // month
    if (durationObject.asMonths() > 1) {
      const durationMonth = Math.round(durationObject.asMonths());

      if (durationMonth === 1) {
        return "a month ago";
      } else {
        return `${durationMonth} months ago`;
      }
    }

    // day
    if (durationObject.asDays() > 1) {
      const durationDate = Math.round(durationObject.asDays());

      if (durationDate === 1) {
        return "a day ago";
      } else {
        return `${durationDate} days ago`;
      }
    }

    // hour
    if (durationObject.asHours() > 1) {
      const durationHours = Math.round(durationObject.asHours());

      if (durationHours === 24) {
        return "23 hours ago";
      }

      if (durationHours === 1) {
        return "an hour ago";
      }

      return `${durationHours} hours ago`;
    }

    // minutes
  },
};

export default dateFormat;
