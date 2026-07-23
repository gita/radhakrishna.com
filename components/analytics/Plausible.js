import Script from 'next/script'

// Privacy-friendly analytics by Plausible
const PlausibleScript = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://plausible.io/js/pa-OeZ-vCbBlFQURdSQrdo55.js"
      />
      <Script strategy="afterInteractive" id="plausible-init">
        {`
            window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
            plausible.init()
        `}
      </Script>
    </>
  )
}

export default PlausibleScript

// https://plausible.io/docs/custom-event-goals
export const logEvent = (eventName, ...rest) => {
  return window.plausible?.(eventName, ...rest)
}
