import { Svg, Path } from "react-native-svg"

export default function EmptyStar({ color, size = 30 }) {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 28 28"
        >
            <Path
                d="M14.437 3.103a1 1 0 0 1 .455.455l2.923 5.924 6.538.95a1 1 0 0 1 .555 1.706l-4.731 4.611 1.116 6.512a1 1 0 0 1-1.45 1.054l-5.848-3.074-5.848 3.074a1 1 0 0 1-1.45-1.054l1.116-6.512-4.731-4.611a1 1 0 0 1 .554-1.706l6.538-.95 2.924-5.924a1 1 0 0 1 1.34-.455Z"
                fill="none"
                stroke={color}
            />
        </Svg>
    )
}