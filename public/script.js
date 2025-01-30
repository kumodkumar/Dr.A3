const bodyParts = [
    { name: "Head", x: 50, y: 5, radius: 5 },
    { name: "Chest", x: 50, y: 25, radius: 5 },
    { name: "Left Arm", x: 20, y: 30, radius: 5 },
    { name: "Right Arm", x: 85, y: 30, radius: 5 },
    { name: "Stomach", x: 50, y: 45, radius: 5 },
    { name: "Left Leg", x: 40, y: 60, radius: 6 },
    { name: "Right Leg", x: 60, y: 60, radius: 6 },
];

const image = document.getElementById("humanBody");
const tooltip = document.getElementById("tooltip");
const container = document.querySelector(".container");

let isHoveringTooltip = false;

container.addEventListener("mousemove", (event) => {
    const rect = image.getBoundingClientRect();
    const mouseXPercent = ((event.clientX - rect.left) / image.offsetWidth) * 100;
    const mouseYPercent = ((event.clientY - rect.top) / image.offsetHeight) * 100;

    let found = false;
    bodyParts.forEach((part) => {
        const dx = mouseXPercent - part.x;
        const dy = mouseYPercent - part.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < part.radius) {
            tooltip.style.left = `${part.x}%`;
            tooltip.style.top = `${part.y - 5}%`;
            tooltip.innerHTML = `
                <div>${part.name}</div>
                <button id="internalButton">Internal</button>
                <button id="externalButton">External</button>
            `;
            
            tooltip.style.transform = "translate(-50%, -100%)";
            tooltip.style.display = "block";
            found = true;

            // Add click listener for the Internal button
            document.getElementById("internalButton").addEventListener("click", () => {
                window.location.href = `/internal/${encodeURIComponent(part.name.toLowerCase())}`;
            });

            // Add functionality for the External button
            document.getElementById("externalButton").addEventListener("click", () => {
                window.location.href = `/external/${encodeURIComponent(part.name.toLowerCase())}`;
            });
        }
    });

    if (!found && !isHoveringTooltip) {
        tooltip.style.display = "none";
    }
});

// Keep tooltip visible when hovering over it
tooltip.addEventListener("mouseenter", () => {
    isHoveringTooltip = true;
});

tooltip.addEventListener("mouseleave", () => {
    isHoveringTooltip = false;
    tooltip.style.display = "none";
});

container.addEventListener("mouseleave", () => {
    if (!isHoveringTooltip) {
        tooltip.style.display = "none";
    }
});
