export const ScrollStyles = () => (
  <style jsx global>{`
    .dashboard-scroll {
      scrollbar-width: thin;
      scrollbar-color: #ed272c #f5f5f5;
    }
    .dashboard-scroll::-webkit-scrollbar {
      width: 8px;
    }
    .dashboard-scroll::-webkit-scrollbar-track {
      background: #f5f5f5;
      border-radius: 999px;
    }
    .dashboard-scroll::-webkit-scrollbar-thumb {
      background-color: #ed272c;
      border-radius: 999px;
    }
  `}</style>
);

export default ScrollStyles;