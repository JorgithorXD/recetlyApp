import { Svg, Path } from "react-native-svg"

export default function LogInSvg({fill}) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            stroke={fill}
            fill = "none"
        >
            <Path d="M8 7V2h12v20H8v-5m-4-5h12" />
            <Path d="m12 8 4 4-4 4" />
        </Svg>
    )
}