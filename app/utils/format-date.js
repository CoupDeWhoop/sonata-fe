const options = {
    short: {
        day: "numeric", 
        month: "long", 
    },
    long: {
        day: "numeric",
        month: "long",
        year: "numeric"
    }
}


export const formatDate = (timestamp, option = short) => {

    return new Intl.DateTimeFormat("en-GB", options[option]).format(new Date(timestamp));
} 