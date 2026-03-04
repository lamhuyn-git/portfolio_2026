//GREY

export const grey = {
  greyLight: "#ffffff",
  greyLightHover: "#ffffff",
  greyLightActive: "#ffffff",

  greyNormal: "#ffffff",
  greyNormalHover: "#e6e6e6",
  greyNormalActive: "#cccccc",

  greyDark: "#bfbfbf",
  greyDarkHover: "#999999",
  greyDarkActive: "#737373",

  greyDarker: "#595959",
} as const;

export const greyRgb = {
  greyLight: "255, 255, 255",
  greyLightHover: "255, 255, 255",
  greyLightActive: "255, 255, 255",

  greyNormal: "255, 255, 255",
  greyNormalHover: "230, 230, 230",
  greyNormalActive: "204, 204, 204",

  greyDark: "191, 191, 191",
  greyDarkHover: "153, 153, 153",
  greyDarkActive: "115, 115, 115",

  greyDarker: "89, 89, 89",
} as const;

// BLUE

export const blue = {
  blueLight: "#e7e7ed",
  blueLightHover: "#dbdbe4",
  blueLightActive: "#b4b5c7",

  blueNormal: "#0e1049",
  blueNormalHover: "#0d0e42",
  blueNormalActive: "#0b0d3a",

  blueDark: "#0b0c37",
  blueDarkHover: "#080a2c",
  blueDarkActive: "#060721",

  blueDarker: "#05061a",
} as const;

export const blueRgb = {
  blueLight: "231, 231, 237",
  blueLightHover: "219, 219, 228",
  blueLightActive: "180, 181, 199",

  blueNormal: "14, 16, 73",
  blueNormalHover: "13, 14, 66",
  blueNormalActive: "11, 13, 58",

  blueDark: "11, 12, 55",
  blueDarkHover: "8, 10, 44",
  blueDarkActive: "6, 7, 33",

  blueDarker: "5, 6, 26",
} as const;

// BLACK

export const black = {
  blackLight: "#e7e7e7",
  blackLightHover: "#dadadb",
  blackLightActive: "#b3b3b4",

  blackNormal: "#0b0b0d",
  blackNormalHover: "#0a0a0c",
  blackNormalActive: "#09090a",

  blackDark: "#08080a",
  blackDarkHover: "#070708",
  blackDarkActive: "#050506",

  blackDarker: "#040405",
} as const;

export const blackRgb = {
  blackLight: "231, 231, 231",
  blackLightHover: "218, 218, 219",
  blackLightActive: "179, 179, 180",

  blackNormal: "11, 11, 13",
  blackNormalHover: "10, 10, 12",
  blackNormalActive: "9, 9, 10",

  blackDark: "8, 8, 10",
  blackDarkHover: "7, 7, 8",
  blackDarkActive: "5, 5, 6",

  blackDarker: "4, 4, 5",
} as const;

// MERGED TOKENS

export const colors = {
  ...grey,
  ...blue,
  ...black,
} as const;

export const colorsRgb = {
  ...greyRgb,
  ...blueRgb,
  ...blackRgb,
} as const;

export type ColorToken = keyof typeof colors;
export type ColorRgbToken = keyof typeof colorsRgb;
