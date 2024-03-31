import { Svg, Path } from "react-native-svg"

export default function LogOut({ color }) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 15 15"
            fill="none"
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 1h7v1H2v11h6v1H1zm9.854 3.146 3.34 3.34-3.327 3.603-.734-.678L12.358 8H4V7h8.293l-2.147-2.146z"
                fill={color ? color : "#000"}
            />
        </Svg>
    )
}