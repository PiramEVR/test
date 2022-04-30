export const formatDate = (dates: string) => {
    const date1: Date = new Date(dates);
    let hours = String(date1.getHours());
    if (+hours < 10) hours = '0' + hours;
    let minutes = String(date1.getMinutes());
    if (+minutes < 10) minutes = '0' + minutes;
    let result = hours + ':' + minutes;
    return result
}