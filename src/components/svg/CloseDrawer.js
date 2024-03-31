import { Svg, Path } from "react-native-svg"

export default function CloseDrawer({ fill }) {
    return (
        <Svg
            width={30}
            height={30}
            viewBox="0 0 16 16"
            fill={fill}
        >
            <Path d="m13.63 3.65-1.28-1.27L8 6.73 3.64 2.38 2.37 3.65l4.35 4.36-4.34 4.34 1.27 1.28L8 9.28l4.35 4.36 1.28-1.28-4.36-4.35z" />
        </Svg>
    )
}