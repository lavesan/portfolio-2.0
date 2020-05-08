export const goToSection = (sectionName: string): void => {
    location.href = "#";
    location.href = `#${sectionName}`;
}