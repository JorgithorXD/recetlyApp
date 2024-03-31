import { Svg, Path, Circle } from "react-native-svg"

export default function Search() {
    return (
        <Svg
            width={30}
            height={30}
            viewBox="0 0 24 24"
            data-name="Line Color"
        >
            <Path
                style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                }}
                d="m21 21-6-6"
            />
            <Circle
                cx={10}
                cy={10}
                r={7}
                style={{
                    fill: "none",
                    stroke: "#000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                }}
            />
        </Svg>
    )
}