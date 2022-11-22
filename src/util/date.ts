import moment from "moment";

const dateFormat = {
  /**
   * 영상 등록일 계산
   * @param  {string} ISO8601String
   */
  d1: (ISO8601String: string) => {
    const current = moment();

    const durationObject = moment.duration(current.diff(ISO8601String));

    if (durationObject.asYears() > 1) {
      const durationYear = Math.round(durationObject.asYears());

      // year
      if (durationYear === 1) {
        return "1 year ago";
      }
      return `${durationYear} years ago`;
    }

    // month
    if (durationObject.asMonths() > 1) {
      const durationMonth = Math.round(durationObject.asMonths());

      if (durationMonth === 12) {
        return "11 months ago";
      }

      if (durationMonth === 1) {
        return "1 month ago";
      }

      return `${durationMonth} months ago`;
    }

    // day
    if (durationObject.asDays() > 1) {
      const durationDate = Math.round(durationObject.asDays());

      if (durationDate === 30) {
        return "29 days ago";
      }

      if (durationDate === 1) {
        return "1 day ago";
      }

      return `${durationDate} days ago`;
    }

    // hour
    if (durationObject.asHours() > 1) {
      const durationHours = Math.round(durationObject.asHours());

      if (durationHours === 24) {
        return "23 hours ago";
      }

      if (durationHours === 1) {
        return "1 hour ago";
      }

      return `${durationHours} hours ago`;
    }

    // minutes
    const durationMinutes = Math.round(durationObject.asMinutes());

    if (durationMinutes === 60) {
      return "59 minutes ago";
    }

    if (durationMinutes === 1) {
      return "1 minute ago";
    }

    return `${durationMinutes} minutes ago`;
  },
};

export default dateFormat;
