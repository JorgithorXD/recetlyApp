import { Svg, Path } from "react-native-svg"

export default function MyRecipes({fill}) {
    return (
        <Svg
        width={24}
        height={24}
        viewBox="0 0 34 34"
        fill = {fill}
      >
        <Path
          className="clr-i-outline clr-i-outline-path-1"
          d="M10 5.2h18v1.55H10z"
        />
        <Path
          className="clr-i-outline clr-i-outline-path-2"
          d="M29 8H9.86A1.89 1.89 0 0 1 8 6a2 2 0 0 1 1.86-2H29a1 1 0 0 0 0-2H9.86A4 4 0 0 0 6 6a4 4 0 0 0 0 .49 1 1 0 0 0 0 .24V30a4 4 0 0 0 3.86 4H29a1 1 0 0 0 1-1V9.07A1.07 1.07 0 0 0 29 8m-1 24H9.86A2 2 0 0 1 8 30V9.55a3.63 3.63 0 0 0 1.86.45H28Z"
        />
        <Path fill="none" d="M0 0h36v36H0z" />
      </Svg>
    )
}