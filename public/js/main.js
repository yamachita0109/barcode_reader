const start = () => {
  const btn = document.querySelector('.button')
  const result = document.querySelector('.result')
  btn.setAttribute('disabled', true)
  result.textContent = ''
  const res = []
  Quagga.init(
    {
      inputStream: {
        type: 'LiveStream',
        target: document.querySelector('.content')
      },
      constraints: {
        width: 640,
        height: 480,
        facingMode: 'environment',
      },
      decoder: {
        readers: ['ean_reader']
      }
    },
    function (err) {
      if (err) {
        console.error(err)
        return
      }
      console.log('start')
      Quagga.start()
    }
  )

  Quagga.onProcessed((result) => {
    const ctx = Quagga.canvas.ctx.overlay
    const canvas = Quagga.canvas.dom.overlay
    ctx.clearRect(0, 0, parseInt(canvas.width), parseInt(canvas.height))
    if (result?.box) {
      console.log(JSON.stringify(result.box))
      Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, ctx, { color: '#55C501', lineWidth: 2 })
    }
  })

  Quagga.onDetected((result) => {
    document.querySelector('.result').textContent = result.codeResult.code
    res.push(result.codeResult.code)
    if (res.length == 6) {
      res.shift()
    }
    if (res.length == 5 && res.every(v => v == res[0])) {
      Quagga.canvas.dom.overlay.style.display = 'none'
      Quagga.stop()
      btn.removeAttribute('disabled')
    }
  })
}