import { Svg, Path } from "react-native-svg"

export default function ShowDrawer() {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 448 448"
        >
            <Path
                style={{
                    fillOpacity: 1,
                    stroke: "none",
                }}
                d="M0 636.362h448v64H0zm0 160h448v64H0zm0 160h448v64H0z"
                transform="translate(0 -604.362)"
            />
        </Svg>
    )
}