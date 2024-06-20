export const AdminClick = () => {
    const div_admin: HTMLElement | null = document.querySelector(".div-admin");
    const exclud: HTMLElement | null = document.querySelector(".abri");

    if (div_admin && exclud) {
        exclud.addEventListener("click", () => {
            div_admin.classList.remove("abri-tabela");
        });
    }

    if (div_admin?.classList.contains("abri-tabela")) {
        div_admin.classList.remove("abri-tabela");
    } else {
        div_admin?.classList.add("abri-tabela");
    }

    div_admin?.addEventListener("click", (event) => {
        if (
            event.target instanceof HTMLElement &&
            div_admin.contains(event.target)
        ) {
            div_admin.classList.remove("abri-tabela");
        }
    });
};

