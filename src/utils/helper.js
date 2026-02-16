export const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "-";
    return timestamp.toDate().toLocaleDateString();
};

export const generateToken = () => Math.floor(1000 + Math.random() * 8999);

export const visitDate = (timestamp) => new Date(timestamp * 1000).toLocaleTimeString() ;