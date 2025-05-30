/* global nn */
const params = new URLSearchParams(location.search)

let GIF = 'images/butterfly.gif'
const v = params.get('v')
if (v === '1') {
  GIF = 'images/butterfly-yellow.gif'
}

const COLOR = 'plum'

function createGif(x, y, w, h, url) {
  const gif = nn.create('img')
    .set({
      src: `${url}#${Math.random()}`
    })
    .css({
      position: 'absolute',
      width: w,
      height: h,
      left: x - w / 2,
      top: y - h / 2,
      transition: 'all 1s' // so that CSS changes are animated
    })
    .addTo('body')

  // adding mouse events to the gif
  gif.on('mouseover', () => {
    gif.css({
      width: 0,
      height: 0
    })
  })

  gif.on('mouseout', () => {
    setTimeout(() => {
      gif.css({
        width: `${w}px`,
        height: `${h}px`
      })
    }, 1000)
  })
}

async function createGifCircle(num, scale, radius, url) {
  const gif = await nn.loadImage(url)
  for (let i = 0; i < num; i++) {
    const cx = nn.width / 2
    const cy = nn.height / 2
    const x = cx + Math.sin(i * scale) * radius
    const y = cy + Math.cos(i * scale) * radius
    createGif(x, y, gif.width, gif.height, url)
  }
}

async function setup() {
  nn.get('body').css({
    backgroundColor: COLOR,
    overflow: 'hidden'
  })

  createGifCircle(22, 0.3, 100, GIF)
  createGifCircle(22, 0.3, 150, GIF)
  createGifCircle(22, 0.3, 200, GIF)
}

nn.on('load', setup)