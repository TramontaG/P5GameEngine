export const randomRGB = () => {
    const randomValue = () => Math.round(Math.random() * 255);

    return [
        randomValue(),
        randomValue(),
        randomValue(),
    ]
}
