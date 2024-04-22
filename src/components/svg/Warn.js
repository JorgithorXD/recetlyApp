import { Svg, Path } from "react-native-svg"

export default function WarnIcon({ fill }) {
    return (
        <Svg
            width={28}
            height={28}
            viewBox="0 0 24 24"
        >
            <Path
                style={{
                    fill: "none",
                    stroke: fill,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                }}
                d="M12 9v4m.05 4h-.1"
            />
            <Path
                d="M10.25 4.19 2.63 18a2 2 0 0 0 1.75 3h15.24a2 2 0 0 0 1.75-3L13.75 4.19a2 2 0 0 0-3.5 0"
                style={{
                    fill: "none",
                    stroke: fill,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                }}
            />
        </Svg>
    )
}