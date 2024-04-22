import { Svg, Path } from "react-native-svg"

export default function SuccessIcon({ fill }) {
    return (
        <Svg
            width={28}
            height={28}
            viewBox="0 0 24 24"
        >
            <Path
                fill={fill}
                d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16m3.293 4.293L10 13.586l-1.293-1.293a1 1 0 1 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l6-6a1 1 0 1 0-1.414-1.414"
            />
        </Svg>
    )
}