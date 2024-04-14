import { Svg, Path } from "react-native-svg"

export default function HalfStar({ color, size }) {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 28 28"
        >
            <Path
                d="M14.892 3.558a1 1 0 0 0-1.794 0l-2.924 5.924-6.538.95a1 1 0 0 0-.554 1.706l4.73 4.611-1.116 6.512a1 1 0 0 0 1.451 1.054l5.848-3.074 5.848 3.074a1 1 0 0 0 1.45-1.054l-1.116-6.512 4.73-4.611a1 1 0 0 0-.554-1.706l-6.538-.95zM14 19.548V5.142l2.82 5.712 6.315.918-4.57 4.455 1.079 6.29z"
                fill={color}
            />
        </Svg>
    )
}