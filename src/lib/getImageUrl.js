const BASE_API = import.meta.env.VITE_BASE_API;

export const getImageUrl = (filePath) => {
    if (!filePath) return undefined;
    if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
        return filePath;
    }

    const cleanBasePath = BASE_API.endsWith("/")
        ? BASE_API.slice(0, -1)
        : BASE_API;
    const cleanFilePath = filePath.startsWith("/") ? filePath : `/${filePath}`;

    return `${cleanBasePath}${cleanFilePath}`;
};
