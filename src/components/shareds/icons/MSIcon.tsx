import { SVGIconProps } from "@/types/ui.type";

const MSIcon: SVGIconProps = (svgProps) => {
  return (
    <svg
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      {/* <rect x="17" y="17" width="10" height="10" fill="#FEBA08" /> */}
      <rect x="70" y="70" width="60" height="60" fill="#FEBA08" />
      <rect x="5" y="70" width="60" height="60" fill="#05A6F0" />
      <rect x="70" y="5" width="60" height="60" fill="#80BC06" />
      <rect x="5" y="5" width="60" height="60" fill="#F25325" />
    </svg>
  );
};
export default MSIcon;
