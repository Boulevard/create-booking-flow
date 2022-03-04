export const Calendar = (props?: any) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                stroke="#33343C"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16 2V6"
                stroke="#33343C"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 2V6"
                stroke="#33343C"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3 10H21"
                stroke="#33343C"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
