const BASE_API = import.meta.env.VITE_BASE_API;

export const getImageUrl = (filePath) => {
    if (!filePath) return "/uploads/profile-pictures/default-profile.png";

    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
        return filePath;
    }

    const cleanBasePath = BASE_API.endsWith("/")
        ? BASE_API.slice(0, -1)
        : BASE_API;

    let cleanFilePath = filePath;
    if (!filePath.startsWith("/") && !filePath.startsWith("uploads/")) {
        cleanFilePath = `/uploads/profile-pictures/${filePath}`;
    } else if (!filePath.startsWith("/")) {
        cleanFilePath = `/${filePath}`;
    }

    return `${cleanBasePath}${cleanFilePath}`;
};
