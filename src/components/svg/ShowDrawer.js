import { Svg, Path } from "react-native-svg"

export default function ShowDrawer({ stroke = "#ebebeb" }) {
    return (
        <Svg
            width={36}
            height={36}
            viewBox="0 0 24 24"
        >
            <Path
                d="M3 12h18M9 18h12M3 6h12"
                style={{
                    fill: "none",
                    stroke: stroke,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                }}
            />
        </Svg>
    )
}