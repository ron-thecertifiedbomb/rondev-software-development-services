export function pad2(value: number) {
    return String(value).padStart(2, "0");
}

export function formatTime(date: Date) {
    const hours24 = date.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours24 >= 12 ? "PM" : "AM";

    return `${pad2(hours12)}:${pad2(minutes)}:${pad2(seconds)} ${ampm}`;
}

export function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-PH", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}