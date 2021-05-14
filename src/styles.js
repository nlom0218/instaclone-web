import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

export const lightTheme = {
    accent: "#0095f6",
    borderColor: "rgb(219, 219, 219)"
}
export const darkTheme = {
    fontColor: "lightgray",
    bgColor: "#2c2c2c"
}

export const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    input {
        all: unset;
    }
    body  {
        background-color: white;
        font-size: 14px;
        font-family: "Open Sans", sans-serif;
        color: rgb(38, 38, 38);
    }
    a {
        text-decoration: none;
    }
`