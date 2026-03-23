import { useEffect } from 'react'

export default function ClickEcho() {
  useEffect(() => {
    const onClick = (e) => {
      const el = document.createElement('div')
      el.className = 'click-echo'
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 750)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
