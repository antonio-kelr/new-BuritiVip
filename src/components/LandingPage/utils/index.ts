export const BarsClick = () => {
    const divMobile: HTMLElement | null = document.querySelector(".div-mobile");
    const Xmark: HTMLElement | null = document.querySelector(".Xmark");

    if (divMobile && Xmark) {
        Xmark.addEventListener("click", () => {
            divMobile.classList.remove("abri-menu");
        });
    }

    if (divMobile?.classList.contains("abri-menu")) {
        divMobile.classList.remove("abri-menu");
    } else {
        divMobile?.classList.add("abri-menu");
    }

    divMobile?.addEventListener("click", (event) => {
        if (
            event.target instanceof HTMLElement &&
            divMobile.contains(event.target)
        ) {
            divMobile.classList.remove("abri-menu");
        }
    });
};

