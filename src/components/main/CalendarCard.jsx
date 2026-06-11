import { Calendar } from "antd";
import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
    root: {
        padding: 10,
        backgroundColor: token.colorPrimaryBg,
        boxShadow: "1px 1px 6px rgba(0,0,0,0.2)",
        height: 350,
        borderRadius: 10,
        "& .ant-radio-button-wrapper": {
            borderColor: "black",
        },
        "& .ant-radio-button-wrapper.ant-radio-button-wrapper-checked": {
            borderColor: "red",
            color: "red",
        },
        "& .ant-picker-calendar-date-value": {
            width: 40,
            height: 40,
            fontSize: 10,
        },
        "& .ant-picker-cell.ant-picker-cell-in-view.ant-picker-cell-today.ant-picker-cell-selected .ant-picker-cell-inner":
            {
                backgroundColor: "black !important",
                color: "white !important",
                borderRadius: "6px !important",
            },
        "& .ant-picker-cell-today .ant-picker-cell-inner::before": {
            borderColor: "black !important",
        },
        "& .ant-picker-cell-selected .ant-picker-cell-inner": {
            backgroundColor: "black !important",
            color: "white !important",
            borderRadius: "6px !important",
        },
    },
}));

export const CalendarCard = () => {
    const { styles: classNames } = useStyles();

    return <Calendar fullscreen={false} classNames={classNames} />;
};
