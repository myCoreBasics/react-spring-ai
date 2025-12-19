import { extendTheme } from '@chakra-ui/react'
import 'pretendard/dist/web/static/pretendard.css'

const theme = extendTheme({
    styles: {
        global: () => ({
            '@font-face': [
                {
                    fontFamily: 'GangwonEduPower',
                    src: "url('https://cdn.jsdelivr.net/gh/fonts-archive/GangwonEduPower/GangwonEduPower.css') format('woff2')",
                    fontWeight: '400',
                    fontStyle: 'normal',
                },
            ],
            '*' : {
                fontFamily: 'Pretendard, sans-serif !important'
            },
            '.Gangwon': {
                fontFamily: 'GangwonEduPower, sans-serif !important',
            },
        }),
    },
    colors: {
        blueGray: {
            50: '#ECEFF1',
            100: '#CFD8DC',
            200: '#B0BEC5',
            300: '#90A4AE',
            400: '#78909C',
            500: '#607D8B',
            600: '#546E7A',
            700: '#455A64',
            800: '#37474F',
            900: '#263238',
        },
        amber: {
            50: '#FFF8E1',
            100: '#FFECB3',
            200: '#FFE082',
            300: '#FFD54F',
            400: '#FFCA28',
            500: '#FFC107',
            600: '#FFB300',
            700: '#FFA000',
            800: '#FF8F00',
            900: '#FF6F00',
            A100: '#FFE57F',
            A200: '#FFD740',
            A300: '#FFC400',
            A400: '#FFAB00',
        },
        mint: {
            50: "#E3F3FB",
            100: "#C7E6F8",
            200: "#ABDAF5",
            300: "#A3D8F4",
            400: "#7AC9F0",
            500: "#52BCEC",
            600: "#2BAFEC",
            700: "#149BE8",
            800: "#1386D2",
            900: "#1173BC"
        }
    },
    components: {
        Button: {
            variants : {
                amber: {
                    bg: "amber.300",
                    color: "black",
                    _hover : {
                        bg: "amber.500",
                        color: "black",
                    }
                },
                gray: {
                    bg: "blueGray.50",
                    color: "black",
                    _hover: {
                        bg: "blueGray.100",
                        color: "black",
                    }
                },
                mint: {
                    bg: "#A3D8F4",
                    color: "#1A202C",
                    _hover: {
                        bg: "#81E6D9",
                        color: "#1A202C",
                    },
                    _active: {
                        bg: "#7FB9ED",
                        color: "#1A202C",
                    }
                },
                gradient: {
                    bg: "linear-gradient(270deg, #9AE6B4 0%, #90CDF4 100%)",
                    color: "black",
                    _hover: {
                        bg: "linear-gradient(270deg, #8EE1AB 0%, #7DC4F1 100%)",
                        color: "black",
                    }
                }
            }
        },
        Link: {
            baseStyle: {
                '&:hover': { textDecoration: 'none' },
            },
        },
    },
});

export default theme;