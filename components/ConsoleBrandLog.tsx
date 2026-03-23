"use client";

import { useEffect } from "react";

export default function ConsoleBrandLog() {
    useEffect(() => {
        const b =
            "color: #004E98; font-weight: bold; font-family: monospace; line-height: 1.1;"; // Blue
        const w =
            "color: #FFFFFF; font-weight: bold; font-family: monospace; line-height: 1.1;"; // White
        const c = "color: #00bcd4; font-weight: bold; font-family: monospace;"; // Cyan for footer
        const g = "color: #666666; font-family: monospace;"; // Gray for separator

        console.log(
            `%c██╗ %c██████╗  ██████╗ %c██╗██████╗ 
%c██║ %c██╔══██╗██╔═══██╗%c██║██╔══██╗
%c██║ %c██████╔╝██║   ██║%c██║██║  ██║
%c██║ %c██╔══██╗██║   ██║%c██║██║  ██║
%c██║ %c██║  ██║╚██████╔╝%c██║██████╔╝
%c╚═╝ %c╚═╝  ╚═╝ ╚═════╝ %c╚═╝╚═════╝ 
`,
            // Line 1: i (blue), R+O (white), iD (blue)
            b,
            w,
            b,
            // Line 2
            b,
            w,
            b,
            // Line 3
            b,
            w,
            b,
            // Line 4
            b,
            w,
            b,
            // Line 5
            b,
            w,
            b,
            // Line 6
            b,
            w,
            b,
            // Separator line
            g,
            // Footer text
            c
        );
    }, []);

    return null;
}
