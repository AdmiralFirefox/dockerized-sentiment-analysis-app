interface SmileyIconProps {
  width: string;
  height: string;
}

const SmileyIcon = ({ width, height }: SmileyIconProps) => {
  return (
    <svg
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <g>
        <path
          style={{ fill: "#ececec" }}
          d="M256.016,0C114.625,0,0,114.625,0,256s114.625,256,256.016,256C397.375,512,512,397.375,512,256
          S397.375,0,256.016,0z M256.016,450.031c-107,0-194.047-87.063-194.047-194.031c0-37.766,11.031-72.953,29.781-102.781h328.5
          C439,183.047,450,218.234,450,256C450,362.969,362.969,450.031,256.016,450.031z"
        />
        <path
          style={{ fill: "#ececec" }}
          d="M221.266,261.375c-5.328-11.313-13.172-21.031-22.984-28.031c-9.781-6.984-21.672-11.188-34.344-11.188
          c-12.656,0-24.547,4.203-34.344,11.188c-9.813,7-17.656,16.719-22.984,28.063l23.656,11.125c3.578-7.594,8.688-13.75,14.5-17.875
          c5.859-4.156,12.266-6.344,19.172-6.344c6.922,0,13.328,2.188,19.156,6.344c5.813,4.125,10.938,10.281,14.531,17.875
          L221.266,261.375z"
        />
        <path
          style={{ fill: "#ececec" }}
          d="M405.375,261.375c-5.344-11.313-13.188-21.031-23-28.031c-9.781-6.984-21.656-11.188-34.313-11.188
          s-24.563,4.203-34.344,11.188c-9.813,7-17.656,16.719-23,28.063l23.656,11.125c3.563-7.594,8.688-13.75,14.5-17.875
          c5.844-4.156,12.266-6.344,19.188-6.344c6.906,0,13.313,2.188,19.141,6.344c5.828,4.125,10.953,10.281,14.531,17.875
          L405.375,261.375z"
        />
        <path
          style={{ fill: "#ececec" }}
          d="M167.781,344.844c17.234,30.844,50.281,51.813,88.203,51.813c37.953,0,71.016-20.969,88.234-51.828
          l-26.609-14.875c-12.109,21.609-35.109,36.203-61.625,36.203c-26.484,0-49.469-14.594-61.594-36.219L167.781,344.844z"
        />
      </g>
    </svg>
  );
};

export default SmileyIcon;