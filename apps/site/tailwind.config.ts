module.exports = {
   mode: "jit",
   content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./ui/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@jstemplate/adslist/src/**/*.{js,ts,jsx,tsx}"
   ],
   theme: {
      extend: {
         fontFamily: {
            sans: ["var(--font-inter)"]
         },
         colors: {
            primary: "#068179",
            "primary-content": "#E6F2F2",
            secondary: "#F27125",
            "secondary-content": "#EBEDEF",
            success: "#3EA875",
            "success-content": "#F7F8F9",
            "base-100": "#9CA3AF",
            "base-200": "#85929E",
            "base-300": "#5D6D7E",
            "base-content": "#001324",
            accent: "#06648156",
            "accent-content": "#D6DBDF",
            info: "#283746",
            "info-content": "#AEB6BF",
            neutral: "#1A2B3A",
            "neutral-content": "#E7E9EE",
            error: "#FF4040",
            "error-content": "#ffffff",
            warning: "#FF9900"
         },
         boxShadow: {
            boxShadow: "0px 3px 6px rgba(0, 119, 111, 0.08)",
            sectionShadow: "0px 6px 24px rgba(6, 129, 121, 0.08)",
            card: "0px 20px 32px -8px rgba(6, 129, 121, 0.16)",
            owlCard: "0px 6px 12px -4px rgba(6, 129, 121, 0.1)",
            searchShadow: "0px 12px 32px -6px rgba(0, 119, 111, 0.2)",
            filterShadow: "0px 2px 6px rgba(6, 129, 121, 0.08)",
            frontShadow: " 0px 24px 24px -12px rgba(6, 129, 121, 0.12)"
         }
      },
      container: {
         screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1350px"
         }
      }
   },
   plugins: []
};
