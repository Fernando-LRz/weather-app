const nextDayDate = (date: Date) => {
    return new Date(date.getTime() + (24 * 60 * 60 * 1000));
};

export default nextDayDate;