/** @type {import('tailwindcss').Config} */
export default {
    mode: "jit",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2196F3" || "#BA68C8",
                primaryHover: "#2563EB" || "#AB47BC",
                secondary: {
                    500: "#BA68C8",
                    600: "#AB47BC"
                }
            }
        },
    },
    plugins: [],
}