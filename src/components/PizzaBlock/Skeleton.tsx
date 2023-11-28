import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC<any> = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="265" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="311" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="419" rx="10" ry="10" width="91" height="44" />
    <rect x="145" y="419" rx="30" ry="30" width="131" height="44" />
  </ContentLoader>
);

export default Skeleton;
