const start = () => {
  const btn = document.querySelector('.button')
  const video = document.createElement('video')
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')
  const result = document.querySelector('.result')
  btn.setAttribute('disabled', true)
  result.textContent = ''
  const userMedia = {
    video: {
      facingMode: 'environment'
    }
  }
  navigator.mediaDevices.getUserMedia(userMedia).then((stream) => {
    video.srcObject = stream
    video.setAttribute('playsinline', true)
    video.play()
    read()
  })
  const read = () => {
    let flg = false
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight
      canvas.width = video.videoWidth
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const img = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(img.data, img.width, img.height, {
        inversionAttempts: 'dontInvert'
      })
      if (code) {
        draw(code.location)
        result.innerText = code.data
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        btn.removeAttribute('disabled')
        flg = true
      }
    }
    if (!flg) {
      setTimeout(read, 10)
    }
  }
  const draw = (l) => {
    const drawLine = (begin, end) => {
      ctx.lineWidth = 4
      ctx.strokeStyle = '#55C501'
      ctx.beginPath()
      ctx.moveTo(begin.x, begin.y)
      ctx.lineTo(end.x, end.y)
      ctx.stroke()
    }
    drawLine(l.topLeftCorner, l.topRightCorner)
    drawLine(l.topRightCorner, l.bottomRightCorner)
    drawLine(l.bottomRightCorner, l.bottomLeftCorner)
    drawLine(l.bottomLeftCorner, l.topLeftCorner)
  }

}