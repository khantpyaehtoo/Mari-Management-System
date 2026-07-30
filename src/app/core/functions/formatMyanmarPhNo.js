export const formatMyanmarPhoneNumber = (input) => {
    if (!input) return "";

    let cleaned = input.toString().replace(/[\s-+]/g, "");

    if (cleaned.startsWith("95")) {
        cleaned = cleaned.slice(2);
    } else if (cleaned.startsWith("0")) {
        cleaned = cleaned.slice(1);
    }

    if (!cleaned.startsWith("9")) {
        return input;
    }

    // +95 (9) XXXXXXXX
    return `+95 (${cleaned.slice(0, 1)}) ${cleaned.slice(1)}`;
};
