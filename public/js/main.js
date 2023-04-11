const start = (e) => {
  e.style.display = 'none'
  Quagga.init(
    {
      inputStream: {
        type: "LiveStream",
        target: document.querySelector('.content')
      },
      constraints: {
        facingMode: "environment",
      },
      decoder: {
        readers: ["ean_reader"]
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
    document.querySelector('#result').textContent = result.codeResult.code
  })
}