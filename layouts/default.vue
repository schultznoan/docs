<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
import auth from '~/middlewares/auth.js'
export default {
  middleware: auth,
  mounted () {
    const yaMetrika = document.createElement('script')
    yaMetrika.type = 'text/javascript'
    yaMetrika.innerHTML = `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(96542445, "init", {
          clickmap:true,
          trackLinks:true,
          accurateTrackBounce:true,
          webvisor:true
    });`
    document.body.appendChild(yaMetrika)

    const yaMetrikaWatch = document.createElement('noscript')
    yaMetrikaWatch.innerHTML = '<div><img src="https://mc.yandex.ru/watch/96542445" style="position:absolute; left:-9999px;" alt="" /></div>'
    document.body.appendChild(yaMetrikaWatch)
    this.$router.afterEach((to, from) => {
      window.ym(96542445, 'hit', to.fullPath, {
        referer: from.fullPath
      })
    })

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-TYNJG387ED';
    document.head.appendChild(gaScript);
  }
}
</script>
