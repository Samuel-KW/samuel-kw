import React, { useState, useRef } from "react";

interface DraggableProps {
    containerRef: React.RefObject<HTMLElement>;
    dragItemRef?: React.RefObject<HTMLElement>;
}

export default function Draggable ({ containerRef, dragItemRef }: DraggableProps) {

    // If dragItem is undefined, throw an error.
    if (!containerRef.current) throw new Error("No reference to the draggable container");
    
    // If dragItem is undefined, set it to the container.
    // Clicking anywhere on the container will start dragging.
    if (dragItemRef === undefined) dragItemRef = containerRef;
    if (!dragItemRef.current) throw new Error("No reference to the draggable element");

    const container: HTMLElement = containerRef.current;
    const dragItem: HTMLElement = dragItemRef.current;

    // Current X and Y positions
    let currentX = 0,
        currentY = 0;

    // Offset X and Y positions of the container while dragging
    let xOffset = 0,
        yOffset = 0;
    
    // Initial X and Y positions of the container once dragging starts
    let initialX = 0,
        initialY = 0;
    
    let active = false;

    container.addEventListener("touchstart", dragStart, false);
    document.addEventListener("touchend", dragEnd, false);
    document.addEventListener("touchmove", drag, false);

    container.addEventListener("mousedown", dragStart, false);
    document.addEventListener("mouseup", dragEnd, false);
    document.addEventListener("mousemove", drag, false);

    function dragStart(e: MouseEvent | TouchEvent) {
        const target = e.target as HTMLElement;

        if (e instanceof TouchEvent) {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        const ignoredElems = ["INPUT", "BUTTON", "A", "P", "H1", "H2", "H3", "H4", "H5", "H6", "SPAN"];
        if (target === dragItem ||
            (container === dragItem && ignoredElems.indexOf(target.nodeName) == -1)) active = true;
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        active = false;
    }

    function drag(e: MouseEvent | TouchEvent) {
        if (active) {
            e.preventDefault();

            if (e instanceof TouchEvent) {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, container);
        }
    }

    function setTranslate(xPos: number, yPos: number, el: HTMLElement) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
}