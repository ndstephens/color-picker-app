import chroma from 'chroma-js'

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

const getRange = hexColor => {
  const end = '#fff'
  return [
    chroma(hexColor)
      .darken(1.4)
      .hex(),
    hexColor,
    end,
  ]
}

const generateScale = (hexColor, numberOfColors) => {
  return chroma
    .scale(getRange(hexColor))
    .mode('lab')
    .colors(numberOfColors)
}

const generatePalette = starterPalette => {
  const { paletteName, id, emoji, colors } = starterPalette

  const newPalette = {
    paletteName,
    id,
    emoji,
    colors: {},
  }

  for (const level of levels) {
    newPalette.colors[level] = []
  }

  for (const color of colors) {
    const scale = generateScale(color.color, 10).reverse()
    scale.forEach((hexVal, index) => {
      newPalette.colors[levels[index]].push({
        name: `${color.name} ${levels[index]}`,
        id: color.name.toLowerCase().replace(/ /g, '-'),
        hex: hexVal,
        rgb: chroma(hexVal).css(),
        rgba: chroma(hexVal)
          .css()
          .replace('rgb', 'rgba')
          .replace(')', ',1.0)'),
      })
    })
  }

  return newPalette
}

export { generatePalette }
