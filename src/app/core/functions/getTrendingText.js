// Dynamic Trending Text Helper Function

export const getTrendingText = (growthPercentage) => {
    if (growthPercentage === undefined || growthPercentage === null) {
        return "0% last month";
    }
    const percent = Number(growthPercentage);
    if (percent > 0) {
        return `+${percent}% last month`;
    }
    return `${percent}% last month`;
};
