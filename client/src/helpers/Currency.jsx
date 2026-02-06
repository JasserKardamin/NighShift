export const Currency = ({ size = 20, className = "" }) => (
  <svg
    height={size}
    width={size}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 511.999 511.999"
    xmlSpace="preserve"
    className={className}
  >
    <path
      fill="#432DD7"
      d="M405.952,201.859C400.28,182.859,511.999,0,511.999,0S247.687,156.359,234.64,150
        c-21.25-10.359,5.188-58.875,5.188-58.875l-188,158.484l0,0c-2.766,2.375-5.469,4.875-8.094,7.5
        c-58.312,58.312-58.312,152.844,0,211.156s152.844,58.312,211.156,0c6.328-6.328,16.938-20.188,16.938-20.188l176.171-234.749
        C447.999,213.328,411.171,219.359,405.952,201.859z"
    />
    <circle fill="#A396FF" cx="149.219" cy="362.56" r="106.66" />
  </svg>
);

export const FormatCurrency = ({ value, size }) => {
  return (
    <div className="text-[#432DD7] font-bold flex justify-center items-start gap-2">
      {value}
      <Currency size={size} />
    </div>
  );
};
