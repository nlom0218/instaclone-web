import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

export const lightTheme = {
    borderColor: "rgb(219, 219, 219)",
    accent: "#0095f6",
    fontColor: "rgb(38,38,38)",
    bgColor: "#FAFAFA",
    facebookFontColor: "#385285",
    inputFocusBorderColor: "rgb(38, 38, 38)"
}
export const darkTheme = {
    borderColor: "#323232",
    accent: "#379CF9",
    fontColor: "#e2e2e2",
    bgColor: "#1C1C1C",
    facebookFontColor: "#497CC7",
    inputFocusBorderColor: "#FCFCFC"
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
        background-color: ${props => props.theme.bgColor};
        font-size: 14px;
        font-family: "Open Sans", sans-serif;
        color: ${(props) => props.theme.fontColor};
    }
    a {
        text-decoration: none;
    }
`