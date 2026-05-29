const DateTimeFormatter = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

export default DateTimeFormatter;
