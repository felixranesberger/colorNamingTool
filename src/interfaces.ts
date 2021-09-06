export interface State {
  colorName: string,
  colorHexValue: string,
  isColorPickerHidden: boolean,
  activeAlert: boolean,
}

export interface ColorPickerData {
  hex: string,
  hsv: {
    h: string,
    s: string,
    v: string,
  },
  rgba: {
    a: string,
    b: string,
    g: string,
    r: string,
  },
}
