import { Calendar } from "antd";
import { createStyles } from "antd-style";

const useStyles = createStyles(({ token }) => ({
    root: {
        padding: 20,
        backgroundColor: token.colorPrimaryBg,
        boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
    },
}));

const stylesObject = {
    root: {
        borderRadius: 10,
    },
};

export const CalendarCard = () => {
    const { styles: classNames } = useStyles();

    return (
        <Calendar
            fullscreen={false}
            classNames={classNames}
            styles={stylesObject}
        />
    );
};
