import { Svg, Path } from "react-native-svg"

export default function Add({ size = 24, fill = "#332232" }) {
    return (
        <Svg
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 52 52"
        >
            <Path d="M30,29h16.5c0.8,0,1.5-0.7,1.5-1.5v-3c0-0.8-0.7-1.5-1.5-1.5H30c-0.6,0-1-0.4-1-1V5.5C29,4.7,28.3,4,27.5,4 h-3C23.7,4,23,4.7,23,5.5V22c0,0.6-0.4,1-1,1H5.5C4.7,23,4,23.7,4,24.5v3C4,28.3,4.7,29,5.5,29H22c0.6,0,1,0.4,1,1v16.5 c0,0.8,0.7,1.5,1.5,1.5h3c0.8,0,1.5-0.7,1.5-1.5V30C29,29.4,29.4,29,30,29z" />
        </Svg>
    )
}