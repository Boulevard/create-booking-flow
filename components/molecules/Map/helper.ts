export const scrollIntoStore = (isMobile, store) => {
    if (!isMobile) {
        const element = document.getElementById(store?.location?.id)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'center',
            })
        }
    }
}
