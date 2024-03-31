import { Svg, Path } from "react-native-svg"

export default function AddFavorite() {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 28 28"
            fill="none"
        >
            <Path
                clipRule="evenodd"
                d="M5 2.924C5 1.862 5.862 1 6.924 1h13.472c1.062 0 1.924.862 1.924 1.924v22.132c0 1.585-1.81 2.49-3.08 1.54l-5.58-4.187-5.58 4.186c-1.27.952-3.08.046-3.08-1.54zm15.396.578a.577.577 0 0 0-.578-.578H7.502a.577.577 0 0 0-.578.578v20.976c0 .238.272.374.462.231l5.12-3.84a1.924 1.924 0 0 1 2.309 0l5.119 3.84c.19.143.462.007.462-.23z"
                fill="#000"
                fillRule="evenodd"
            />
            <Path
                d="M10 11a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1"
                fill="#000"
            />
            <Path
                d="M14 15a1 1 0 0 1-1-1V8a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1"
                fill="#000"
            />
        </Svg>
    )
}