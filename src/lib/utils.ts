export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(price);
};

export const cn = (...classes: (string | undefined | false | null)[]) => {
    return classes.filter(Boolean).join(" ");
};
