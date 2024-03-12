<template>
  <main v-if="document" class="main">
    <div class="container">
      <div class="info">
        <div class="info-input" :class="{ disabled: !document.activate }">
          <div v-if="!document.activate" class="info-input__title">
            Ссылка будет доступна после активации
          </div>
          <div v-else class="info-input__title">
            Ссылка активирована до {{ formattedData }}
          </div>
          <div ref="textElement" class="info-input__link">
            {{ document.link }}
          </div>
        </div>
        <div
          class="info-action"
          :style="document.activate ? 'cursor: pointer;' : ''"
          @click="copy($event)"
        >
          <svg
            width="26"
            height="31"
            viewBox="0 0 26 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 4.5C5.5 2.27418 7.23778 0.5 9.34483 0.5H21.6552C23.7622 0.5 25.5 2.27418 25.5 4.5V22.5C25.5 24.7258 23.7622 26.5 21.6552 26.5H9.34483C7.23778 26.5 5.5 24.7258 5.5 22.5V4.5Z"
              stroke="#567BF3"
              stroke-opacity="0.5"
            />
            <path
              d="M0 8.5C0 6.01472 2.03788 4 4.55172 4H17.4483C19.9621 4 22 6.01472 22 8.5V26.5C22 28.9853 19.9621 31 17.4483 31H4.55172C2.03788 31 0 28.9853 0 26.5V8.5Z"
              fill="#AABDF9"
            />
          </svg>
        </div>
      </div>
      <div v-if="document.activate" class="how">
        <div class="how-title">Инструкция</div>
        <div class="how-desc">
          <div class="how-desc__head">
            <u>Для автора</u>
            <!-- <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" fill="#567BF3" />
              <path
                d="M9.992 14.6667V6.74666L10.508 7.31066H8.096V6.26666H11.18V14.6667H9.992Z"
                fill="white"
              />
            </svg> -->
          </div>
          <div>
            Вход для редактирования документа доступен только одним способом: по ссылке и паролю. При утере восстановление доступа невозможно. Скопируйте данные и сохраните их в надежном месте. Адресату передайте лишь ссылку на документ и адрес сервиса. 
          </div>
        </div>
        <div class="how-desc">
          <div class="how-desc__head">
            <u>Для адресата</u>
            <!-- <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" fill="#567BF3" />
              <path
                d="M7.444 15V14.184L10.864 10.884C11.168 10.596 11.392 10.344 11.536 10.128C11.688 9.904 11.788 9.7 11.836 9.516C11.892 9.324 11.92 9.14 11.92 8.964C11.92 8.532 11.768 8.192 11.464 7.944C11.16 7.696 10.716 7.572 10.132 7.572C9.684 7.572 9.28 7.648 8.92 7.8C8.56 7.944 8.248 8.172 7.984 8.484L7.168 7.776C7.488 7.368 7.916 7.056 8.452 6.84C8.996 6.616 9.592 6.504 10.24 6.504C10.824 6.504 11.332 6.6 11.764 6.792C12.196 6.976 12.528 7.244 12.76 7.596C13 7.948 13.12 8.364 13.12 8.844C13.12 9.116 13.084 9.384 13.012 9.648C12.94 9.912 12.804 10.192 12.604 10.488C12.404 10.784 12.116 11.116 11.74 11.484L8.692 14.424L8.404 13.956H13.48V15H7.444Z"
                fill="white"
              />
            </svg> -->
          </div>
          <div>
            Кроме автора и адресата никто не может получить доступ к документу. Адресат получит доступ к документу следя инструкциям сервиса. Адресат сможет удалить документ после копирования или прочтения.
          </div>
        </div>
        <div class="how-desc">
          <div>
            1 автор = 1 ссылка – 1 адресат 
          </div>
        </div>
      </div>
      <div v-if="!document.activate" class="how">
        <div class="how-title">Как активировать ссылку?</div>
        <div class="how-desc flex">
          <div class="how-desc__icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" fill="#567BF3" />
              <path
                d="M9.992 14.6667V6.74666L10.508 7.31066H8.096V6.26666H11.18V14.6667H9.992Z"
                fill="white"
              />
            </svg>
          </div>
          <div>
            Нажмите на кнопку «Оплатить» и внесите сумму согласно тарифу
          </div>
        </div>
        <div class="how-desc flex">
          <div class="how-desc__icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <circle cx="10" cy="10" r="10" fill="#567BF3" />
              <path
                d="M6.456 12.936V12.096L10.752 6.6H12.048L7.788 12.096L7.176 11.904H13.884V12.936H6.456ZM11.124 15V12.936L11.16 11.904V10.08H12.288V15H11.124Z"
                fill="white"
              />
              <rect width="20" height="20" fill="url(#pattern1)" />
              <defs>
                <pattern
                  id="pattern1"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlink:href="#image0_330_746"
                    transform="scale(0.00195312)"
                  />
                </pattern>
                <image
                  id="image0_330_746"
                  width="512"
                  height="512"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAIABJREFUeAHtnQmYXFWZ9yvsmyCOjiOjgjrqjLgz7sg0Tgype27d93aP5Q4Kjhl1XFBUZkY/pxVBnHG+70FQJ4MaxW0s+57bnYSWIBpEEUQE2QSFgMgiWxJJZMla33M63dm6q7uWe2+de84vzwOdVFfdOuf//t73/567Vir8QQEUsFqBgZUDex2XDD0pGomeH+jotUpHdZXGi8I0/miQxGeoJPqi0tG3lZYxlcoPlJafKS1XqkRuVoncqrSs2e2/jUpLc7f/zGu7vm/is/FvJ7Zltrlt22MT35VEXzTfbcZgxmLGZMZmxmjGasZstagMDgVQAAVQAAX6qcBxjfrjQj34gkAPhiqR92wzVTkv1PEPlZbrQy33Ki1bdzPr3c3bxn9vnRz7dUrLRWEq5yktp6s0freZ60Sj0Kg/rp/a890ogAIogAIokJ8Czco8GZWnqCQ6NtTRO4Mk+qzScRJouUYl8qcSGnvWzcZ6paNfhYmMKC1nBon8o9HKaFZpVublFxi2jAIogAIogAIZKRCNRYepROaHafQBlUSLlZafKi3rMflphxvabSI2KC03KB03wiQeNocZaiO1I4eHh/fIKGRsBgVQAAVQAAXaV8Ac3zZGFGo5IdRy1uSx8dUYfddG325DMPU+01RdaQ4rmGYr1INHDywZ2K/9CPJOFEABFEABFJhLgWZl3sKx6NnG7FUqX5g8Ic6sTKfMiJ92aPGoSuUXoZZzgiQ+PtCDz5ortPweBVAABVAABbYrUFtWOyBM478P0ujflZbvT54Zj8nbYfKdxmG1SuV8peUT5rwCE9vtgeYvKIACKIACfiuwYMWCAyeO25tjzNsuc3uU1b2zezc2TRw6MIdtzKWUy9WhftPP7FEABVDAIwWOWrxo7yCJjgmT+DSVyOVKy2YM31nDn2uPgWkIzD0TPjlxHgH3LvCoEjBVFEABLxQIR8JnqiR+X6ijZZyV763Zz9UMmN+vMzdTCtPovdU0foYXycEkUQAFUMAlBeqN+p4qjY/adumYXMkKH9PvjoFo1cRVHonMN3uOXMoR5oICKIACzihQb9QPCtL49ZO3xDW3tG1nxcd70KldBlaHqXzLnDtgzhtxJnGYCAqgAAqUUYE4jR9rCvLEbWa5q167Rsb7em96HjGHk8ylofMb9UPKmDuMGQVQAAVKp4ApuKGWEycv0eN6/N7NjIagNw03bLvUMHpbdbx6cOkSigGjAAqggM0KVMer+4ajUmOlz2ENyw/tbN8zwD0HbK4ojA0FUMBuBZqVeTU9+HdKx19RWtZaXvhZRfe2inZRvzWhlnPVqLyahxrZXWoYHQqggCUKTDxQR8upE8+yx1RcNEb/5pTK7eZJhwvT+AhL0oxhoAAKoIAdCkzs4k/kDSqVC5SWLaz22dXvKAObQx2NmxNX6436PnZkH6NAARRAgT4oEDbCvzTX6oda7nW04Pu32mWvTVsxn2T+zNrS2tP6kHp8JQqgAAoUr4B5lru59755xju34WWlT+MnW7Y9gyKqm8dMF5+RfCMKoAAK5KzAtmv25cNKy20UfYwfBmZgIJFbwzT6gLmpVc7pyOZRAAVQIH8FzD3VzQlQnMk/Q8Fnd3lbu8s9bBYeNLcgllF5Sv4ZyjegAAqgQMYKVHXtNUrLck7qw/g9NPCsGpsNKpElwag8L+P0ZHMogAIokK0C5vj+xA17tFxG0cf4YSBTBn5qcot7CmRbs9gaCqBAjwqYS5rMfdGVll9T9DMt+lmtJNmOI4dbAi3XqDReNLBkYL8e05aPowAKoED3CtQb9f1VEp+stNyF8WP8MFAoA3cEWt5PI9B9/eKTKIACXShgbtxjViEYf6EFn1W8I6v4LBulyfsJnMqzB7ooZHwEBVCgfQXMc9DNZUpKy91ZFjG2RSMBA70yEN2ntNAItF/OeCcKoEA7Chy1eNHekyt+jJ9VKHsirGZgWyNg9tK1k9u8BwVQAAVmVGDirn06qistt7BC63WFxudhqEAGzAOI0nhRvVHfc8bk5kUUQAEUaKVALY1jpeV6inaBRdvqlSU6lDQXrp24fLBVovM6CqAACkwpEIxEf6u0/LikxY7d0zQRMDAzAyuDNH7hVJ7zEwVQAAW2K1BNhp6skmgxd+5jpUvz5ywDW8JUzovGoiduT3z+ggIo4K8C8xv1Qybv1f8Ihd/Zws+qeOZVsa+6rA119CFzcq+/lY+Zo4DPCjQr8ybv3ncPxo/xw4CPDMS/VTqq+1wGmTsKeKdAdSR6kdLyU4q+j0WfOcP9NAYu4oFD3tkAE/ZNgeMa9ceZx4wqLZspgtOKoK+7g5k3hwcMA5vMOUDVRv0JvtVF5osCbivQrMxTafwOpWU1xo/xwwAMzMLA/SqN3up2QWR2KOCJAuFI+Eyl5aJZEp4VICtAGICB3Rn4/sI0PsKTMsk0UcAtBcxTwsIkHlZaHsX8WfHBAAx0wcBD5vkC3E3QLW9gNo4rEKbxgErk5i4SfvdVAP9mZQgDvjOQyOWcJOi4aTC98itgHgk6eU3/FsyfFR8MwECGDGwytcXsWSx/pWQGKOCYAkESHcOqn4KfYcFn5e/7yn+m+Zs9i0l0rGPlk+mgQDkVqI5XD1Za/kdp2UrxpwGAARgogIEtKpUvRGPRY8pZNRk1CjigQJjGL2XVT8EvoOCzN2Cm1TCv3RbqwaMdKKVMAQXKo4A5K9ecnau0bKT40wDAAAz0kYGJcwN4rkB5/IORlliBIBk6XGm5pI8Jz2qQlR8MwMCuDCRyeTWNn1Hi0srQUcBuBcyDO5SWNZg/Kz4YgAELGXhQpfEiu6soo0OBkimw7US/6BsWJvyuqwBWRegBAzCg44Zarg4tWZlluChgnwKhHnyF0tEqzJ8VHwzAQGkYSOV2c2myfRWVEaFACRQwJ9UoLafz5D6KfmmKPqt/Vv+7MrBZpdGnBlYO7FWCkssQUcAOBcwjOUMd/5DCj/nDAAw4wMAlQSP4CzuqK6NAAYsVqCbRq5SWuxxIelZDu66G0AM9fGbgTnM40+LSy9BQoL8KmDNolZYNmD+rPhiAAQcZMPcMOLW/VZZvRwHLFDAP2FA6/oqDCe/zioe5s+KHgRkZiL5hHlxmWRlmOChQvAJhI3xqoOMrMH9WfDAAAx4xcHVtae1pxVdcvhEFLFGgmsZVpWW1R0nPimjGFRHGRw54ycADakSOs6QcMwwUKEiBZmXe5L38t1D4vCx8NEI0QjCwjQHzFNMzh4eH9yio+vI1KNA/BeqN+kFBIksxfowfBmAABrYxECSSLlix4MD+VWa+GQVyVuC4ZOhJSsuVJD2FHwZgAAZ2ZSDQck01GXpyzmWYzaNA8QooPfhclcrtJP2uSY8e6AEDMLATA3cGafzC4is034gCOSmgEpmvtPxxJ8g5/scxYBiAARiYmYF15gTpnMoxm0WB4hRQOjpJadmI+bPKgQEYgIG2GdgU6uhdxVVqvgkFslSgWZkXJvEwCd92wrMamnk1hC7o4i0DoZazuEIgS2NiW7krUB2v7hum8i3MH/OHARiAgV4ZiBvmbqm5F26+AAV6VeC4Rv1xSsuPSfpek57PwxAMwMAkA4lcWltWe3yv9ZnPo0BuCphbWyod/5akpXDDAAzAQOYM3BgkQ4fnVsDZMAp0q8DCsejZSssdJH3mSe/t8U9YgiUY2JWBQMvvAz34rG7rNJ9DgcwVqI3UjlRa7iZZd01W9EAPGICBHBi4JxqJnp95IWeDKNCpAiqNj1JaHsgBcla+nP0NAzAAAzMzsCYYlZd1Wq95PwpkpoAalVcrLQ9i/qxyYAAGYKBwBtarJDo2s4LOhlCgXQUMeErLepK+8KRnRTTzighd0MVHBh6qpfGCdus270OBnhUI9GCotDyC+WP+MAADMNB3BjaEiQz2XNjZAArMpYDS0Ru5tW/fE97HlQ5zZoUPA60Z2BxqOWGu+s3vUaBrBVQavVVp2UTHTwMAAzAAA9YxsFml8Tu6LvB8EAVaKWDAUlq2kvTWJT2rotarIrRBG98Y2BpqObFVHed1FOhYgTCR1yktmzF/zB8GYAAGrGdgc5DGb+q40PMBFNhdgUDXhGP+1ie8b6sc5svKHgZmZ2BjOCq13es5/0aBthVQicznbH/MnxUfDMBAKRnYUE3jatsFnzeiwJQCalReqRL5E4lfysRndTT76gh90McXBh4KkuiYqbrOTxSYU4EwjV+qtKzD/DF/GIABGCg9Aw/WktpL5iz8vAEFglF5ntKymqQvfdL7ssJhnqzmYWBuBtZWR6IX4XAo0FKBcCR8ptLyB8wf84cBGIABtxgItdxbG6n9dUsD4Bf+KlBbWnua0nInSe9W0hNP4gkDMLCdgVRuD5Khw/11OmY+TYFBPfhnoZabtkMy9+4kdrmhEQzAAAyUk4Eb1XJ16DQj4AX/FKg36vsoLT/C/FklwAAMwIA3DPy4Ol7d1z/HY8Y7FGhW5ikdfYOk9ybpWbGVc8VG3IhbHgx8p9KszNthCPzNKwVCLZ/B/DF/GIABGPCWgU96ZXpMdpsCkw/3yaOrZJusVmAABmCgHAxsDdL47fiiRwqoETmOx/p62/FTmMtRmIkTcSqKgY2Bjl7rkQX6O9XaSO1IpWUtu/xoAGAABmAABiYZeDAaiZ7vrzN6MPNoLDpMpXI7SU/SwwAMwAAM7MbAndVk6MkeWKF/U6w36gcpLVfvFvCidjHxPezOhAEYgAHrGYh/uWDFggP9c0iHZzw8PLxHkMhSzJ+OHwZgAAZgYHYG4oTLAx1qCJSWT8wecBICfWAABmAABrYxEGj5F4cs0N+pmLM7lZbNgE1xgwEYgAEYaJOBLYGOFvrrnA7M3Dz0QWl5oM2Ac3zO+uNzFC9YhgEYKIyB1eYhcQ5YoX9TGFgysJ/S8S9JlsKShQaKBgoGYMA1Bq6uN+r7++egJZ+xSmQJ5o/5wwAMwAAM9MJAmMp5JbdDv4avkvh9vQScz1IwYAAGYAAGtjOQxov8ctGSzjbUg69QWjZsDxy75FzbJcd8YBoGYKBoBjZWk+hVJbVFP4YdjUVPVFruxPzp3GEABmAABjJm4O7jkqEn+eGmJZvlUYsX7a20XJJxwIvuMvk+VjYwAAMwYC8DPxpYObBXyezR/eEqLadj/nT8MAADMAADeTIQpNG/u++oJZphqAeP5mY/JH2eSc+24QsGYGCSgU1qVF5ZIot0d6jzG/VDlJbfkZwkJwzAAAzAQCEMJHJrdbx6sLvOWpKZKR19u5CA23tMiuOFxAYGYAAGCmYg0PL1ktikm8MMtZyA+dPxwwAMwAAM9IOBII3f5Ka7Wj4rc49mpeXBfgSd76TYwAAMwAAMKC1/XJjGR1hul24Nz1yGoRK5lAQkAWEABmAABvrLQPSTeqO+p1sua/FswiQe7m/ASTj0hwEYgAEY2M7Axyy2THeGVktqL1FaNgLedvA4+afgk39gD/ZgAAZ2Y2BTNam93B2ntXAm5rILpaNVuwmPAWKAMAADMAAD/WUgkZvrjfpBFlqnG0MKtZyL+dN5wwAMwAAMWMlAEp/thttaNouqrr1GadlqZdDpvPvbeaM/+sMADNjBwBZzZ1rL7LPcw1mwYsGB7Pqn46f5gwEYgAHbGQi13DSwZGC/cruuRaMPtHzJ9qAzPgoTDMAADMCAYcBcqWaRhZZ3KGEaD7Drn6SisMIADMBAiRjYUBupHVle57Vg5PVGfX+VyM0lCjrH4ew4DkcciAMMwEBfGQi1XDY8PLyHBVZaziEoLZ/G/On6YQAGYAAGSslAEr+vnO7b51EvHIuerbQ8Wsqg03n3tfOGGcwCBmDACgYS+ZN5bk2f7bRkX9+szFNafmRFADFzzBwGYAAGYKBLBkIdjZfMgfs73CCRf8T86eBhAAZgAAZcYCBI5M39ddWSfHttWe3xSstqF4LOHCheMAADMAADSkf3qeXq0JLYcP+GqZJoMQlDwsAADMAADDjFALcJnr2xCJPwxUrLZqeC3uVxIzSg+MEADMCAUwxsDvXgC2Z3QV9/26zMM9dNArxTwHPiEA0gDMAADOxg4KeVZmWerzbfct6hlhMxf8wfBmAABmDAZQY4IXC3NmB+o36I0nKPy0FnbhQ1GIABGIABpeWueqN+0G426O8/gyT6LIlBYsAADMAADHjBQBp9yl/H32nmMipPUVoe9iLoO44DcUwMLWAABmDAXwYeDhvhU3eyQj//qrR8B/On64cBGIABGPCJgUDL1/10/clZh2n8Uh71S9L7lPTMFd5hAAYmGdgSjER/620ToHT0E5KBZIABGIABGPCRgUBHF3vZANTSOPYx4MyZQgcDMAADMDDFQKAHQ6+agHqjvqfScv2UAPwkGWAABmAABjxl4Nrh4eE9vGkCgjR+u6eB5qxff8/6JfbEHgZgYEYGvLk5UL1R30fpaBUNAN0+DMAADMAADEhTJXKr8Ubn9wKEafQBAk7SwwAMwAAMwMAOBkIdvcvpBmDBigUHcsvfHQEHfrSAARiAARiYZMDcInh/Z5uAQEcfAXZghwEYgAEYgIHpDARa3u9kA1BbVjsg1HIvQZ8edDRBExiAARiAAaXlbif3AqgkPgXAARwGYAAGYAAGZmEgid/n1F6AgSUD+5lHIBL0WYLO5TEzXh4DMzADAzDgGQNu7QUItHzQswBiZjQ0MAADMAADXTEQptF7ndgLUB2v7svqnw6eBhAGYAAGYKA9BgItvz9q8aK9S98EhDp6J0FvL+johE4wAAMwAAOGAXPH3FI3AOb+xkrLbwAaoGEABmAABmCgIwZuLPUzAsJEXkfAOwp4V8eL0BiNYQAGYMA9BgJdk9LuBQi1XAaU7kFJTIkpDMAADBTCwM9L2QBUde01AFIIIOw14ExjGIABGHCUgSCJjildE6C0LKcBoAGAARiAARiAgV4YiEdL1QCEI+EzlZYtBL2XoPNZ+IEBGIABGJAt1TR+RmmagFDLOQSNxIUBGIABGICB3hkItZxVigYgTuPHKi3rCXrvQUdDNIQBGIABGFBa1s1v1A+xvgngkb/ASsGCARiAARjIloFQRx+yugGoN+p7Ki2/I/DZBh490RMGYAAGPGcgkVutvjFQOCo1IPUcUkcvxYFruIYBGOg3A+GIBNbuBQh1NN5vgfh+khQGYAAGYMBFBoJEllrZAATJ0OFKy2YXRWdOFBMYgAEYgAELGNiyMI2PsK4JUFrOtEAc7obFLngYgAEYgAFnGQiT+DSrGoB6o75PqOVeGgA6ZBiAARiAARjIlYE/HLV40d7WNAFhIm8g4LkG3NluFm7gBgZgAAY6YyBI43+wpgEItKwggJ0FEL3QCwZgAAZgoEsGllvRAFSToSdz8h8QdwkxezY4VgsDMAADnTOwKRqLDut7ExCk0ccp/jQAMAADMJAvA6dc/NHmt2/83+ZV917dvH3d75vrN65vmj/rNqyf+Ld5/Vs3fqf5oZUfwVA7N9QyanZqfxuAZmWeSuRmEj/fxEdf9IUBPxmQ0aHm2Vd9oXnn+rsmzL7d/92x/s7m5686p2k+DzvOsvObSrMyr29NQE0P/h1wOQsXhcOPVQRxtjTOH/3xvzZ/v+6Odj1/xvfd/uDtzY/8+F+IsaUx7tk/R+WVfWsAVBJ9uecJuBoY5kXRgQEY6JKBr13/jeaWrVtmNPVOX9y8dXPzq9d9jVh0GQvLPe6/+9IAVMer+yotay0XB+jdhJ64ElcnGQh13Fy2anmnHt/W+5fesrxptk/Ndmqv7RpzH57CmwCloyFAcgokCgOmCgN9ZMCY8/itF7Rl5t2+6bs3fY8Y9zHGeXimeQhf4Q1AmMhIHpNhmzQVMAADvjFgzH/5qvFufb2jz332is/RBLjVBHyn0AagOl49WGl52LckZb4YEwzAQNYMFLHy37lDMJcNvmn58TQB7jQBD0Vj0WMKawJCLSdmnQRsj8IKAzDgGwNFm/9UI2D2NvimtcvzDZL4+MIaAJXKBS6LydwwIhiAgbwZKHK3/5TxT/3cuGVj8/jxt9MEOLIXINTRskIagDiNH6u0bMg7Odg+BRgGYMBVBvpp/lNNwP9c+2UaAEcaAKXl0fmN+iG5NwGhlhNcTUrmheHAAAzkzYAN5m+agKvv/RUNgDsNQDNI5M25NwBKy1jeCcL2KcIwAAMuMtCvY/5Tq/6df27asqn5uqVvpAlwpgmIk1wbgHqjfhBn/1OYXSzMzAmu82bAlpX/zk3AB1d+mAbAmQZAHlqwYsGBuTUBYSJvyDtJ2D6FGAZgwDUGbDR/0wh86rLTaQDcaQCaYSKvy60BUFq+41piMh/MBgZgIE8GbDV/0wCcc/UXaQBcagBSOS+XBmBg5cBeSsuaPBOFbVOIYQAGXGLAZvM3DcDnr/oCDYBDDYDSsrreqO+ZeRMQpvGAS4nJXDAaGICBPBmw3fxNA/DJn32aBsCtBqBZTaJXZd4AqDT6XJ7JwrYpxjAAA64wUAbzNw3AyStPoQFwrAEIkviM7BsALb9xJTmZB0YDAzCQFwPG/PN+qp8x717/mLsB/sPSN9AAONYAKC3XZtoAVNP4GXklC9ulEMMADLjCQFlW/qZ5uOreqzF/98x/IqYL0/iIzJqAQMv7XUlQ5oHZwAAM5MFAmczfNACLrzmXBsDRBiBI5J8yawDMgwbySBi2SSGGARhwgYGymT8PA3I778JERjJpAI5avGhvpeVBF5KUObgNPfElvv1goCzH/Hc+Z2DZquWs/h1d/U/mwNpMLgcMkuiYfiQV30kxhwEYsJ2BMpr/ug3rmm9c/lYaALcbgGY1qb28570AYRKfZnsSMj6MAgZgoGgGyrbbf2oPwGmXnYH5O27+E7mQxP+n5wZAJXJ50YnF91HMYQAGbGagjCt/0wB856bvYv4+mP+2OV7SUwNQHa8erLRstjkRGRtGAQMwUCQDZTV/c28CM/YiteK7+pqbG3t6OmA4IgEB7GsASVZ/unViXYJYl3W3/wW3XdgMU8zfOz9LZH7XewGUljO9E6wERYiY0JTBQPEMYP7Faw7nPWqeRp/qpQH4GQHoMQA0FKxsYaD0DGD+1MEyemGgo4u7agBqy2oHKC0byjhpxkyywgAMZMUA5g9LWbHUh+08OrBkYL+OmwCVyPw+DLb0KwU0o1jAgDsMYP7uxNLXvDT38um4AQjS6N99FYx5k/QwAAOYPww4Ugc+1nEDoFK5wJHJs1eBY9AwAAMdMYD5Y/6u+F+QyNLOGoBmZZ7SstoVAZgHyQwDMNAuA5g/rLTLSkned3+lWZnXdhNQG6n9dUkm1lFXz5xIbBiAgdkYwPzhYzY+yvq7aho/o+0GQOnobWWdKOMmgWEABrphAPOHm264KcNnQh29pf0GIIm+WIZJMUYSFgZgIAsGMH84yoIja7eRxGe33wBoudLaiXAyE4c9YAAGMmQA88f8Xfe7QMdXtNUA1Bv1fZSWR10XhPmR9DAAA5g/DHhSBx49avGivedsAqoj0Ys8EYRVVIarKJihkJaNAcwfZsvGbC/jDUbleXM2AEpHJ/XyJXyWpIIBGLCdAcwfRm1nNOvxhVpOmLsBSOKzs/5itkeywQAM2MIA5g+LtrBY6DjS6P+10QDIpYUOit3QHIqAARgoiAHMH/P31d/mfDLg8PDwHkrLel8FYt4UBxhwlwHM393YkrdtxXbtrHcEVMnQ0xGyLSFZsRW0YoNHeMyCAcwfjrLgqOzbqCZDT255GCAclVrZJ8j4SXQYgIGdGcD84WFnHrz++4gc17IBUFpO9VocVrXs2YABpxjA/DF/PG0HA6GOPtSyAQi0fB2xdoiFFmgBA+VlAPMvb+zIu5xil0RfbtkAqFR+gfA5Cc/K0qmVJXlid55g/nbHh/zpT3xCLZfN3AA0K/O4AqA/QSEZ0B0GsmMA889OS7h0TssHZ7wSQEblKQTbuWCz6mbPi1cMYP7UMHxsdgaiseiwaXsBqrr2GoSbXTj0QR8YsJcBzN/e2JA39sQmSKJjpjUAKo0XESR7gkQsiAUMtM8A5t++VnDlu1bRSdMagCCJPgsYvoPB/MmB8jGA+ZcvZuRZX2N2+rQGQOk4ISh9DYpXx2phDdayYADzh6MsOPJrG9F3pzUAgZZr/BKBxCHeMFBmBjB/+C0zv30c+5XTGgAuASSZ+ggkez+4WqEjBjB/6hX1qmsG/rhLAzCoB/8MMbsWs6PChc7oDAO9MYD596Yf/KFfdbx68PYmIEjjFwIFUMAADNjOAOYPo7YzWo7xDT53ewPAUwBJqnJAS5x8jhPmD/8+85/l3KtpXN3eAKhE3pPlxtkWiQoDMJAlA5g/PGXJk+/bChL5p+0NQKjlM74LwvwpMDBgJwOYv51xIV9KHZdPb28AlI6+QTBLHUxOROQseicZwPypS3hT9gwEWr6+vQEIdfxDRM5eZDRFUxjongHMv3vt4A7tZmcgvnB7A6C0XD/7mxETfWAABopjAPMvTmu49k9rc+O/nRuA+4HAPwiIOTG3kQHMHy5t5NKxMd0z0QAMrBzYS2nZ4tjknDweSowojK4zgPnDuOuMWzK/zfVGfc9KNBYdZsmAMG1OZIMBjxnA/DF/vKg4BqqN+hMq1ZHoRYhenOhojdYwMJ0BzH+6JnCCJvkyMPjcSqCj1+b7JQQRfWEABlozgPm31gZu0CY3BpLo2EqYyBty+wKPd2eiKYkLA3MzgPnPrREcoVE+DERDFXNLwHw2TtDQFQZgoDUDmH9rbeAGbXJnII3fUVFaTs39i9gTwMltMAADOzGA+WNw+E6fGUjiUypBEp9BIPociJ0Ko62xOH78xObnrzqn+eM7Lmne8MCvm3f/6e7m+o3rm3etv2vi3xffcUnzrF+e3Tx+/O0YXQni2U/OjPmP33pBs2x/zJjN2PupHd9Nrc6KgTCJT6sEWr6U1QbZjltw1tLB5n9c8bnmTWt+09za3NpWvTbvu3H1Tc0zr/jPG1SIAAAgAElEQVTPZphSLMmJXXMC899VD/hAj74xkMRnV5SOvt23AbBSsnY18cGVH27esnZVW6bf6k03r72lefLKU6ydI9wXW3wx/2L1hm/0noOBb5qTAJfO8SYKuGeNypev+2pz05bNrXy9o9fNds699isw5BlDu9cUzB8z2p0J/t1fJoJEUnMS4EUEor+BsEV/U6THblnWkcG3+2azXbN9W+bKOIpjHvMvTmu4Rut2GQi0rKioRC5t9wO8z224Gr8ZadfPu3ofJ1G5zc9M9QHz9y/mM3HAa1ZycInZA3A1wbEyOIWuls/4+We7MvVOP7Tidz/g5EBPDgcY81++arxTRPr+/gtuuxBGPWHUc++7shJquclzEQo1Whu1fsv5J0xc0ldU5WVPgPsNJyt/92NsYy1jTB1xd4O5DPD3iNaRaM41DN+/bUVR3r/9e2gC3GUO83c3tniFU7G9zVwGeB9BdSqoHTUoJ3z/pOamLZu2G3ORf+FwgHvcsdvfvZjiD87G9B5zDsAaAuxsgOdsBr5y3ZIiPX/ad9EEuMMe5u9OLPEEL2L5gGkA1hFsL4I9YzNw7f3XTTPlol+gCSg/f5h/+WOID3gXw7WmAXiIwHsX+Ilm4PXL3pTZDX96bRo4J6C8DHLMv7yxo/Z7Hbv1pgF4FAj8hOCUiz/aq29n+nn2BJSPQ1b+5YsZ9Z6YTTLwsGkANgGEn0B8+vLPZGrgWWyMJqA8LGL+5YkVNZ5YzcDARtMAbJ3hFzMeL+Z9bkH0hau/lIVnZ74NmgD7OcP87Y8R9ZoYzcHAFhoAj+94dY6lDYDpKGgC7C1emL+9sZmj4LOw87jez8DGRAPAIQBPoTjtsjMyX71nuUGaAPuMBvO3LyYzFHaM3tOa3iELE4cAOAnQU1hsOwlwpuaBJsAew8H87YlFh4WehsDTGj8HJxMnAXIZoKdw1JfacxngTOY/9RqXCPbfeIz5mziU7Q/s9J+dOUyI5qR//jNxGSA3AupfAPoO/6/uu6YUNZ09Af0r5Kz8+6c95on2OTIwcSMgbgXscQNw7rVfLUUDYAZJE1B8McT8i9c8x4Lf9wUHc7OKJ3MrYB4G5DOUbzn/bc0NmzfQBHjcBLbiH/O3qlhj3uRo1gzcw+OAgao5fuv3S9MAmIFyXDd/Y+KYf/4at2q8eB3tC2Lgtkqo5aaCvizr7oXtZdS8vPn845vrNqynCchIz7LnE+aPAZWdYcbfFsM3mBsBXY1YbYnldMNx+uVnlqoBMIPlnIDsuWW3f/aaUl/R1FIGrqyoRC61dHBOG66Nmn/3pu+VrgngcEB2xZWVf3Za2pjfjIn47sbAJWYPwEW7vYjxerorGAPwt0AQe39jT/33M/aBlhWVIJGlAOAnADPF3RjBslXnl25PAIcDumfYxHz5qvHSxfyC2y5shmnMgsXTBctM9YvX2q8DQSKpuQzw24jWvmg+aEUT4A8PmL8/sfahdjHHjnj+ZkWl8gVE60g0L1YcNAHuM4H5ux9jajsxbslAKp835wCc3vIN7FrywuxbxZ8mwN3igfm7G9tW+czrxHwXBtLoU5UwjT+6y4uYvtemvzsLNAHuFQ3M372Y7p63/JsYz8VAqKMPVVQaL5rrjfzeb5hoAtyJP+bvTiypy8SyFwZCLSdWgjR+fS8b4bN+QEgTUP44Y/7ljyH1lhhmxUCYyGAl0NFrs9og23EbTpqA8sYX8y9v7KirxC4XBpLo2EqoB1+Qy8Y5l8DJcwloAspXjDD/8sWMmkzM8magNlI7shI0gr/I+4vYvlsw0wSUJ56Yf3liRZ0kVkUyUFtWe3yl3qjvqbRsKfKL+a7yg04TYH8MMX/7Y0QtJEZ9YmDT8PDwHhXzR+novj4Nwsnd5L5oSRNgb/HC/O2NjS/1gXlazeDdE+a/rQGQ6wiW1cGytlGiCbCPG8zfvphQX4mJXQxEv9q5AeCJgJy02HWTQRNgT3HD/O2JhV0FH12Ixw4GJp4EONUBKB19A3F2iIMWnWtBE9C5Zllzhvn3PwZZx5TtEdN8GIi/NuX/lSCJz8jnSwieT7rSBPSPd8y/f9r7lOPM1RHOzHMApv6oNH43gXUksH0+lEETUDxHmH/xmlMv0bzMDIQ6eueU/1cCPRiWeTKM3a5kpAkoLh6Yf3FaU2fQ2hUGAh0t3N4AcDdAwM4abJqA/JnC/PPXOOu8YHvEzAYGqqPynO0NgFquDrVhUIzBreSgCcgvnph/ftpSh9DWdQaq49WDtzcA5i9Ky3rXJ838ik9smoDsNcf8s9eU2oCmHjGwdhfzN/8ItFzjkQBdX/OORp0XCpqAzjVrxRnmn52WrTTmdTR2nIErpzUAYSIjjk8a0+/jFQI0Ab0XVcy/dw2pcWjoOwNBKv87rQFQWs70XRjmn29xoAnoXl/Mv3vtyGu0g4FdGPj0tAbAXBeISLuIxB6DHPYY0AR0zhjm37lm1DI0g4GZGQi1nDitAVBJdCyCzSwYumSrC01A+3pi/u1rRZ6iFQy0wcCovHpaA1BNhp6MeG2Il8Oq2EfdaQLmZg3zn1sjH3OHOcNFLwxEY9Fh0xqASrMyT2lZ18uG+SxgdsIATUBrXjD/1tp0whjvRUcY2IWBB43XT28AJi4FjK9ArF3E4jyAnPd40ARM5w3zn64JdQlNYCATBn42o/mbF5WOv4bImYhM49BB40ATsIM5zH+HFtQitICBbBkItZzbsgEI0/ijCJ6t4OjZnp40AdLE/NtjhZxCJxjojoFAywdbNgA8FbA7UYExG918bgIw/2wYIhfREQZaM1BL4wUtG4Da0trTEK+1eGiTvzY+NgGYf/5ckbtoDAPSNFf7tWwAhoeH9+BKABKl34niUxOA+ZNv/c43vt8bBte0vAJgqitQOvoJQHgDhLUnK/rQBGD+5Bm1FgYKZOBHUz7f8qdK5fMFDshaA0KD/iemy00A5t9/vshxYuATA4GO/6ul8U/9wtwn2CdRmKvdRcDFJgDzt5s5agLxcZKBNHrrlM+3/BnqwRc4OfkOrktn/nYVAJeaAMzfLrbIdeLhCwO1kdqRLY1/6hdHLV60t9LyiC+iMM9yFAAXmgDMvxysUROIk4MMPDKwcmCvKZ+f9adK5RcOCsD5BiXfC1LmJqCWDjaXrxpvlu3PBbdd2AzTmNwpee5Qz71van4+q+nv/MtQyzkA4z0wVhZ90wSM33pB2Xy0ece6O0o3ZqOz0ZtaQC2AgXIzEGo5a2ePn/XvQRIfT8DLHXCX41fWPQFl6gBY+ZP/LtcQ3+YWpPGbZjX9nX8Z6MFn+SYQ8y1XwaMJyK+dwPzLlQvULuI1FwPmLr87e/zsf29W5ikt98+1UX4PeP1kgCYg+yYA8yen+5nTfHf2/IVa7p3d8Gf4baijcYKRfTDQNFtNaQKyawIw/2zZJNfR0w4G4tEZLH72l5SWT9gxeCAiDrMzQBPQexOA+c/OGDmIPmVlIEyjf53d7Wf4bVXXXlPWCTNu/5KVJqD7JgDz9y9fqJH+xDzUg0fPYPGzv1Rv1PdXWjYAij+glD3WNAGdNwGYP/ld9rxn/LMy/MjAkoH9Znf7Fr9ViVyKuLOKyzXSlt0ghSag/SYA8ye3qe/OM7Cyhb3P/XKQxGcAiPOAONfE0ATM3QRg/uQ1td19BsIkHp7b6Vu8I9DRQiBxHxIXY0wT0LoJwPzJaRdznjlN59qcy9fC3ud+ORqLHqO0bELY6cKiif2a0ARMbwIwf/u5pbYQo4wY2FBbVjtgbqef5R2hlssyGoxzu5rRxf5EpQnY0QRg/vbzSk0hRlkxEOjo4lmsvb1fKS2fzGpAbAe4+8EATUCzifmTe/3IPb6zr9x9rD2Xn+Vd5hpCgtjXILLnJIMrDXxuAjB/8pca7h8DYRq/dBZrb+9XAysH9lJaHgQg/wByLeY+NgGYP3nrWh4zn7aYXlNv1Pdsz+XneJfSMobobYnOaj2D1XqerPnUBGD+5GyeucS2rebre3PYevu/DtPovQTb6mDTeHTQePjQBGD+5Cs122MG0nhR+w4/xztVMvR0YPIYpg7MtSycuNwEYP7kalnykHHmw2qQDB0+h6139mul5dcEK59goWt/dHWxCcD8+8MSOYzu9jAQ/aozd2/j3aGW/7BngsBGLLJhwKUmAPPPhglyCx1LzsCn27D0zt4SJNExJReF4+QO7srPgkkXmgDMH9PKIhfYRvk5CvXgKzpz9zbebS4pUFoeAJDyA0IMp8ewzE0A5j89njCOJn4yEN2X2eV/u/cFSss3/RSVZPIh7mVsAjB/ctOH3GSO7XIef213387s30pHdQLRbiB4XxlZKVMTgPmTY2XMMcacJ7fRUGaGv/uGzJOFlJaHCGCeAWTb/earDE0A5k+e9DtP+H7rGHxowYoFB+7u25n+O0gkJfDWBZ4THDM+wdHmJgDzJ/+owTAwnYG4kanZz7QxlUZvnf7FBANN3GPAxiYA83ePM2oHMc2CgTCRN8zk2Zm+Fo1Fj1FaHsliwGwD8G1nwKYmAPMnX2zPF8bXN0YfqY5XD87U7FttTKVyPoHuW6DZ3Z/x7v65WLahCcD8ybe5OOX3PjMSj7by68xfVzp6G7D5DJt/c+9nE4D5+8cb9ZWYd8JAkMibMzf6VhucPAzwcCcD5L0AXXYG+tEEYP7kTdnzhvHnzvBD9Ub9oFZ+ncvrSscNApt7YNndX/Du/rmYLrIJwPzJr7l45PcwEqbyrVxMfraN1tI4Bj7g85GBIpoAzJ/c8jG3mHMX3CeRms2rc/ldvVHfR2lZTcC6CJhlq1pi2HkMTRMwdsuyZh5/zHbN9olL53FBMzTzjIHVxotzMfm5NhpqOdczsSnKNC+7MHDutV9pbtqyOZM+YNOWTc3F13x5l+2TXxgaDMBAKwYCLV+ay6dz+70alVe3GhivA60vDJy88sPNW9be0lMTcPPaW5onrzwF86fBhAEYaJuBalJ7eW4G386GlZYbfSn0zJOmphUDtXSw+Z+/+K+OGwHTOPzHFZ9rhim7/Ftpy+vkHQxMZyDUclOlWZnXjk/n9h6VyL8RnOnBQRN/NXnPRe9rLrn+682f/+GK5l3r72o+tOmhib0D5qf5t3n9q9d9rfnui97XdqcPT/7yROyJ/UwMBDr6SG7G3u6Gw0b4l0rL5pkGyGuACwMwAAMwAAOZM7DpuGToSe36dK7vU1q+T4AzDzCrQ44FwgAMwAAMTGMgSGRprqbeycaVjuo0ADQAMAADMAADMJA/A2Eig514dK7vnbwnwD0EPv/AozEawwAMwIDXDNx91OJFe+dq6p1uPEjiM4DSayin7aaCB3iAARiAgcwZ+GSn/pz7+8NG+FROBsw80Jgqx/9gAAZgAAamGNgcJEOH527o3XyB0rKcbo8mAAZgAAZgAAbyYCAe7cabC/lMoAdDgp5H0NkmXMEADMCA7wwEOlpYiJl38yX1Rn1PlcitvgeJ+VOoYAAGYAAGsmUgWjU8PLxHN95c2GfCNPpAtpMGIvSEARiAARjwmwHjrYUZebdftGDFggOVlgeA1W9YiT/xhwEYgIHMGFg3v1E/pFtfLvRzoZbPEPjMAj919ic/ORMYBmAABvxk4P8WauK9fFk0Fj1RaXmEJoAmAAZgAAZgAAZ6YmCzSoae3osnF/5ZlcgSgt5T0On0/ez0iTtxhwEY2ImBOCncwHv9wmBUnqe0bKUJoAmAARiAARiAge4YCPXg0b36cV8+z1MCuws4iYJuMAADMAADSkc/6Yt5Z/GlKpH5QAzEMAADMAADMNA5A+bmell4cd+2EaZyFYHvPPBohmYwAAMw4DUDv7b+xj9zdRZBEh8PxF5DvNPJLOhALsAADMBAOwwY75zLX63/vXlusdJyRzsT5j0kBgzAAAzAAAzI74x3Wm/w7Qww0PJ+AkpSwwAMwAAMwEAbDKTxu9vx1lK8Z2DJwH5Ky50Evo3Ac/0rhwxgAAZgwFsGAi2/r45X9y2Fubc7SJXEJ9MA0ADAAAzAAAzAwCwMJPKedn21NO+b3AtwF4GfJfB0/d52/eQFeQEDMKC03F1v1PcvjbF3MtBQRx8CciCHARiAARiAgekMBFr+uRNPLdV7a8tqB5gOh8BPDzyaoAkMwAAMeM3AHWZPealMvdPBqkTeA+ReQ85ufg71wAAMwMBuDASJ/GOnflq690/eF+AWmgCaABiAARiAARgwDMS/HVg5sFfpDL2bAas0eitBJ/FhAAZgAAZgQJpBGr++Gy8t5WfM/Y2VlqsJPMkPAzAAAzDgMwOBlmtKf8//TjsRlUSRz0Fn7hQ9GIABGICBahpXO/VPJ96vdHwhCUACwAAMwAAM+MhAqOMfOmHm3UyiNlI7UmnZ5GPgmTMFDwZgAAa8ZmBzMCrP68Y7nfmM0vLfJIHXScDlQLtdDkQ+kA8w4AEDSXy2M0be7USqjfoTlJa1AO8B8BgdzQ4MwAAMGAbW1JbVHt+tbzr1OW4RjPnTAMIADMCANwwk8fucMvFeJmNuDhRqucmb4NMBswqCARiAAV8Z+LXxvF4807nPqiRSNACsAGAABmAABlxmINDRQucMPIsJKS3fdznwzI3CBgMwAAP+MhAksjQLr3RyG0oP/o3SspEE8TdBiD2xhwEYcJSBDYEefJaT5p3VpEItZzkafF+PdzFvjvXCAAzAgJb/zMonnd3OcY3645SW+2kCWAXAAAzAAAw4wsA98xv1Q5w17iwnFiTx8Y4Ena6XlQ8MwAAMeM5AmMgbsvRI57cV6mgZTQDdPwzAAAzAQKkZSOV85w076wkGydDhSsv6Ugfe866X2FG4YQAGPGdgnYzKU7L2Ry+2p5L4ZM/hYdchTRQMwAAMlJSBQMs/e2HWeUxyeHh4D5XIpTQBrCJgAAZgAAbKxECo5TLjYXl4ozfbNI9LVFo2lCnwjJVCBQMwAANeM7ChOirP8cao85xomMSnkUxeJxO7QEu6C5S8JW89ZeATeXqiV9uujlf3VVpu8BQkzA/zgwEYgIHyMHCj8SyvTDrvyVaT2suVli00AawoYAAGYAAGLGVgSzWJXpW3H3q5fZVEX7Q06HTn5enOiRWxggEYyIUBcyt7L825iElHY9FjlJZbaALo/mEABmAABixj4DcLViw4sAgv9PY7gpHob3liIIlvWeLnsppgjnAOA6VhYFMwKi/z1piLnLjS8gkSozSJgTmyuxUGYMBpBgIt/1KkB3r9XebmCoGOLqYJoAmAARiAARjoMwOX1Bv1Pb025aInb+6vrLSs6XPgne5q0ZbCCgMwAAOzMrDWPLemaP/j+yqVitJRHThnhZMGhV2vMAADMJAbA9EbMeM+KqC0fJMmgCYABmAABmCgSAYCLV/to/Xx1UaB+Y36IUrLbUUGnu+i0MAADMCAzwxEq6rj1YNxYQsUMHdeUlo2k5A+JyRzh38YgIFCGNhk7kxrgfUxhCkFVBp9CvgLgZ/jibkdTyR+5DAM2M5AkEYfn/IdflqiwMDKgb2UlpW2w8P4KHAwAAMwUFIGUvkBl/xZYvq7D2OBHvxzpeUOkqukycXKmr0rMAADtjKQyu3VRv0Ju/sO/7ZIAXM7RqXlUZoAmgAYgAEYgIGMGHjE3IbeIqtjKK0UCHX0royCTjduazfOuGATBmCgKAbS+B2t/IbXLVRA6fgrNAF0/zAAAzAAAz0y8N8WWhxDmk2BgSUD+6lUftFj4Omwi+qw+R5YgwEYsI+Bn1fHq/vO5jX8zlIFwkb4VKXlfpoAVgAwAAMwAAMdMvDAwjQ+wlJ7Y1jtKBCm8d9zkyASv8PEZyVm30qMmBCTIhnYXEvjBe14DO+xXAGVyL9hADQBMAADMAADbTLwYcttjeG1rUCzMi9IJG0z8EV2mXwXqxoYgAEYsIqBuFFpVua17S+80X4FastqB6hELqcJYAUAAzAAAzAwIwOp/GLBigUH2u9ojLBjBY5Lhp6ktPxuxsBb1YGSnMQIBmAABgpm4LZoLHpix8bCB8qjQHVUnqO0rC0YLHbx0WDBAAzAgL0M/FHpweeWx8kYadcKhGk8oLRsoAlghQEDMAAD3jOw0Vwt1rWh8MHyKRBqOZHE9z7xWZHZuyIjNsSmCAa2hlpOKJ+DMeKeFQiT+DSaAJoAGIABGPCWgU/0bCRsoKQKNCvzwlTOI/m9Tf4iVhh8BytZGLCSgejbXO5XUu/OathHLV60t9JyEU0ATQAMwAAM+MFAoKOLucd/Vi5a8u3Mb9QPUVquI/n9SH7iTJxhwGsGblDL1aElty2Gn6UCQTJ0uErldgqD14WBXbVW7qqFSepSZgzcJqPylCy9g205okA0Fv2V0nI3yZZZsmGoGCoMwIAtDNyzcCx6tiN2xTTyUMDcDEJpeYAmgCYABmAABpxh4H5zE7g8PINtOqZAkMYvVFrWkPzOJL8tKxDGwWoYBopn4I8qjY9yzKaYTp4KhHrwFUrLepoAmgAYgAEYKC0DD6lReXWeXsG2HVXA3B5SaXmE5C9t8rPaKn61heZobgsDG9SIHOeoPTGtIhQwACktj9IE0ATAAAzAQGkY2BjowbAIj+A7HFdA6WhIadlE8pcm+W1ZgTAOVsMwUDwDm5WO3ui4LTG9IhVQOjpJadlKE0ATAAMwAAPWMrAlSOO3F+kNfJcnCoQ6egt7AqxNfFZaxa+00BzNbWLArPxP8sSOmGY/FAjS+PVKy0ZWADQCMAADMGANAxuVjur98AS+0zMFVBIprg6wJvFtWoEwFlbEMFA8A4/W0jj2zIaYbj8VCNN4QGlZxwqARgAGYAAG+sRAIn8KdPTafnoB3+2pArWk9hKlZTXJ36fkL36lweoOzWHAHgbWqlF5paf2w7RtUCBMwhcrLffTBNAEwAAMwEBhDKwO0/ilNngAY/BcAaUH/0ZpuYvkLyz5WYXZswojFsSiaAb+EIzK8zy3HaZvkwK1pbWnKR2togmgCYABGICB3Bj4nXlsu021n7GgwIQCQTJ0uNJyI8mfW/IXvdLg+1jdwoA9DFwvo/IU7AYFrFVALVeHKi0raQJoAmAABmAgGwZCHf8wTuPHWlv4GRgKTClQb9T3CVM5j+TPJvnRER1hwGMGElliaupUfeUnCtivQLMyL0ziYZ4f4HHhsmfXKbuxiUUZGdhqamilWZlnf8FnhCgwgwJKR29TWjawgqERgAEYgIG2GdgQJPHxM5RUXkKBcilQ1bXXKC1rSf62k7+MqxXGzCobBrJhYI2502q5qjyjRYFZFKiN1I5UWm6jCaAJgAEYgIEWDCRyq7mvyiyllF+hQDkVCBrBX6hUfkHyt0j+bFYPrMLQEQbKycDPo7HoieWs7owaBdpQYMGKBQcqHSc0ATQBMAADMDDFQNyoLasd0EYJ5S0oUHIFzBUCafQBpWUTBWCqAPATFmDAQwY2Ky2ncqZ/yT2N4XeuQE0P/p3Sco+HSc8u2nLuoiVuxC1LBu5XiczvvHLyCRRwRIFqMvRklcjlNAGs/mAABvxhIP7lwjQ+wpEyzjRQoHsFquPVfZWW//En+Sn0xBoGfGXA3CW13qjv333F5JMo4KACoZYTlJaHfS0MzBtThAGnGXg01NE7HSzdTAkFslEgTMIXc78Ap4tglsdQ2RbH5MvCwB3BqLwsmyrJVlDAYQVqy2qPVzq+kNUQjQAMwIADDKzk+n6HDYupZa/AwMqBvSYfJsSlgqzyyrLKY5ywujMDm4I0+ni9Ud8z+wrJFlHAAwXCNH6pSuRmB1YBOxcG/o5RwIDbDNxWTaJXeVCimSIK5KtANBY9RiXRYpoAdgfDAAzYzoA5y9/UrHyrIltHAc8UCBN5ndKy2vYCwPgwKRjwkoE/hjp6i2dlmemiQHEKhI3wqYGOLqbAellg2W3u9m7zMsf3Z7WltacVVwn5JhTwVYEdzxLYQCNAIwADMNBHBjaZk5U50c9XM2LefVOgltReorT8po/JX+YVC2NnNQ0DvTCQyK1qVF7ZtwLIF6OA7wrUG/WDVBKfrbRsoRFgJQgDMFAAA1tCLWeZR5v7Xn+ZPwpYoUCoB1+htNxQQPKzaupl1cRn4afcDFxfTWovt6LoMQgUQIEdChy1eNHe5tnaSsujNAKsBGEABjJkYKPScqZ5cNmOisPfUAAFrFOgNlI7MtRyWYbJz6qt3Ks24kf8umcgkUuro/Ic6wodA0IBFGihQLMyT6XxIqVlHY0AK0EYgIEuGHjI7FHkDP8WNZaXUcB2BaKx6LAgkbSL5O9+xcBqC+1goNwMpHK+ueeI7fWN8aEACrShgLlDl9LRfTQCrARhAAZmYeAepaM3tlFSeAsKoECZFIjT+LHm8h2lhScMskIt9wqV+GUdv42mNsxv1A8pU01jrCiAAh0qEOrBFygtl8yyCsi6uLA9DAsGbGUglR+YE4c7LCO8HQVQoMwKhKNSU6ncTiPALmEY8I+BUMtNKolUmWsYY0cBFOhBAXM3r8l7B3C1gK0rNMbF3oNsGVgzeXb/Pj2UDj6KAijgigJhI/xLlUSLlZbNrAb9Ww0Scy9iviVM5bxqo/4EV+oW80ABFMhQgTAJX6y0rMQQvDAEVtbZrqyt1TPU8Q+jkej5GZYKNoUCKOCqAoEeDJWOfkUjQCMAA+VlIEzlqmoaV12tU8wLBVAgLwXM3QR1VFc6/i0mUF4TIHZexu42cyfQ4eHhPfIqD2wXBVDAAwXMQ4ZCHb1LabkLM/HSTKzdtQ2P03i8I9TROwdWDuzlQWliiiiAAkUpUG/U95l8vsCdFN5phReT9OR4uqXs3zN5Zv/+RdUDvgcFUMBDBXZqBO6wtBhixpixFwwEWn4fptEH6o06xu9hLWbKKNA3BQaWDOwXptF7TRGiEWCPAAwUyIC5gVci76mOV/ftWwHgi1EABVBg2zkCcoLScgMmUKAJsMr3YpW/W05dF2o5weQclQcFUAAF7FGgWZk3cXvhRC7drWj5WKiZMw1KlgxcaYyfs7srmsAAAARWSURBVPrtKXeMBAVQoIUCQRIdo3Q8qrRsoRlgrwAMdMXAZqXjJNSDR7dIM15GARRAAXsVUMnQ05WWM5WWtZhAVyaQ5SqSbZVjr8Q6c1vuhWPRs+3NbEaGAiiAAm0qYJ4zHuroQyqRW2kEaARgYCYGolUqiU+ujlcPbjOteBsKoAAKlEcBcwxTJTJf6bihtGzCCGYyAl7ziIstKpUfmDtu1hv1PcuTyYwUBVAABXpQIBqLDjM3L+EyQgzfI8OfOgzzB3NobGEaH9FDCvFRFEABFCi3AuaSpiCN/0FpWc7jiGkGHG4GNoU6WhYmMshlfOWuWYweBVAgBwWOS4aeZO5sprRc67ARTK0C+VmOk/J6ilOo5aYwiYfDRvjUHFKGTaIACqCAewpUk+hV5mxopWU1zQB7BkrGwAOBli+FevAV7mUmM0IBFECBghQwJ0eZEwfDVM5TWtaXzAh6Wj0y11I1Po+YXfyTJ/TtU1B68DUogAIo4IcC0Vj0mCCJj99WaOVRDLJUBuliM/SI0jIW6ugtC1YsONCPLGSWKIACKNBnBWrLageYWw+zZ4AmoOBG8OGJk/m0nMA1+30uAnw9CqAACkw0A4m8TunoG0rL/QUbgosrW+a0ywmK0X2Blq8rHQ0Z1sg4FEABFEABCxWYuNlQGh9lzrxWWq5UWrbSELCXoHMGolWhlrPM+ScDKwf2shB1hoQCKIACKDCbAkEydHiQyD+ZB6vwTAIagVkaAXO1yfdUGi/ikr3ZMorfoQAKoEAJFTBXFFST2stVEv8fpaOfKC0bZzEEdoPvshvcuebBxP7HQRp9PBiVl3Er3hImNENGARRAgW4VmDh3QA8ebW5JvO2e7PIwDYFzRj/VyBnDN4eEzjQnj3ICX7dZw+dQAAVQwEEFBpYM7Bck0TFKy8cmr+m+j4agnA1BqOXeiUv00uhfQz14dHW8uq+DyDIlFEABFECBvBSIxqK/Mtd5qyQ+O9DxFUqLufZ7alXJTzu0MDH5uUrl89tiNfT0vHhguyiAAiiAAp4qYM4Ir43UjjR3fJu4x/u2u7+xp6C4RuBBpeWnE2fomxP2WN17molMGwVQAAUsUUAtV4caM5o4i9xcPrbtOe80Bt03Bsbor5y80dOp5ri9SoaeXmlW5lkScoaBAiiAAiiAAq0ViMaiw7adVxCdFCTxGUpH31U6/qXS8kcOJcjabSfmGU3k9FDLiUYr81TI1oryGxRAARRAARQouQLmTHRzOCEckcDcqyBM4tO23XEuvnDykch/UFo2l7BRMGP+Q6DlmkDLCjMnM7eJvSMjEpg5cxZ+yeFl+CiAAiiAAjkr0KzMi8aiJyo9+FyVRMea29GqNH6HSuJTjKmGWs5RWr6ptOjJSxkvmbzc7Ualo1VKywNKy5qd/pvpUkfz2s7veWDyszdObuuSbdueuJnSN80JkROGnsSnKB2dNDGmibENPneBHvxzdtPnzASbR4EMFPj/FcDoqImudjYAAAAASUVORK5CYII="
                />
              </defs>
            </svg>
          </div>
          <div>Ссылка активирована для совместного доступа</div>
        </div>
      </div>
      <div v-if="!document.activate" class="how">
        <div class="how-title">Тарифный план</div>
        <div class="flex">
          <div class="tarif">
            <div class="tarif-title">Год</div>
            <div class="tarif-price">
              <span class="tarif-price__price"> 990 ₽ </span>
              <span class="tarif-price__cur"> /год </span>
            </div>
            <div class="tarif-action" @click="submit('year')">Выбрать</div>
          </div>
          <div class="tarif">
            <div class="tarif-title">1 месяц</div>
            <div class="tarif-price">
              <span class="tarif-price__price"> 99 ₽ </span>
              <span class="tarif-price__cur"> /мес </span>
            </div>
            <div class="tarif-action dop" @click="submit('month')">Выбрать</div>
          </div>
        </div>
        <div class="how-desc flex">
          <div class="how-desc__icon">
            <svg
              width="16"
              height="22"
              viewBox="0 0 16 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <mask
                id="mask0_330_756"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="22"
              >
                <rect
                  y="0.5"
                  width="16"
                  height="21.3333"
                  fill="url(#pattern4)"
                />
              </mask>
              <g mask="url(#mask0_330_756)">
                <rect y="0.5" width="16" height="21.3333" fill="#40C057" />
              </g>
              <defs>
                <pattern
                  id="pattern4"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlink:href="#image0_330_756"
                    transform="matrix(0.00520833 0 0 0.00390625 -0.166667 0)"
                  />
                </pattern>
                <image
                  id="image0_330_756"
                  width="256"
                  height="256"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAAdhAAAHYQGVw7i2AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABOdJREFUeJzt3LGPFGUcx+EvSiEYEqpLTCwUtUIbrbQwwQKJiIl/Aq2VWvg3UVhpNFhIYYiFRhtJLMDOGAM0hlzQCovdSxBZ9vZ255155/c8yYQccMxMeD+/d9g7NgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgpVNJLif5PMmtJPvL4+by5y4vfw8wI08n+STJnSQP1hy3k3y8/Bygc6eSfJH14T96XE1yeoTrBXZkL8mNbB7/wfFTkpPNrxrY2rbxHxxXWl84sJ29JL9k+/gPjvNtLx84ql3t/A8fPzS9A+BIdr3zP3y83PA+gA0NsfM/fHzU7lYO76mxLwAmYC/Jt0nODniOMwP+2Ud2fOwLgJHtJbmWYeM/OM/keAKgshY7/4G/GpxjY54AqKrVzn/gj0bnAdYY8tX+VcebTe4MeKKhX+1/3PFn/OcgGN0YO/+DJJ+2uDlgtTF2/gdZvFfAMw3uD1hhrJ3/XpJXG9wfsMJYO//9JO82uD9ghbF2/n+SXGpwf8AK4oeixA9FiR+KEj8UJX4oSvxQlPihKPFDUeKHosQPRYkfihI/FCV+KEr8UJT4oSjxQ1Hih6LED0WJH4oSPxQlfihK/FCU+KEo8UNR4oeixA9FiR+KEj8UJX4oSvxQlPihKPFDUeKHosQPRYkfihI/FCV+KEr8UJT4oSjxQ1Hih6LED0WJH4oSPxQlfihK/FCU+KEo8UNR4i/g2NgXsCPHk7yV5O0kzyU5neR2kltJvln+yOHtJbmW5Gzj8/6d5MMkVxufl06dTPJZkjt58q7yY5ILI11jb/aS3Ej7nf9+/B2xgdeS/JbNFtmVLIYGjyd+unAuyb0cbbH9nMVC57/ETxdezPpH/nXHr1m8VsCCF/zoxvfZzeK7EU8CiZ2fjnyQ3S7C6k8Cdn668nV2vxirDgHx05Vns3hsHGJRVvvngMd+uvNGhl2cVZ4E7Px06WKGX6RzHwLip1vvpc1inesQED9dez3tFu3choD46d6JJPsxBDYlfmbjq7RdxL0PAfEzK5fSfjH3OgTEzyxdT/tF3dv3Cfg6P7P1QhZv9uFJ4PHs/MzeOxnuuwJ7fhKw81PG+YwzBKb6JGDnpxxDYEH8lFV9CIif8qoOAfHDUrUhIH54RJUhIH5YYe5DQPywxlyHgPjhkOY2BMQPG5rLEBA/HFHvQ0D8sKVeh4D4YUd6GwLihx3rZQiIHwYy9SEgfhjYVIeA+KGRqQ0B8UNjUxkC4oeRjD0ExA8ju5Dx3mPQe/jBBIz1JGDnh4mY+xAQP6wx1yEgfjikuQ0B8cOG5jIExA9H1PsQED9sqdchIH7Ykd6GgPhhx3oZAuKHgUx9CIgfBjbVISB+aGRqQ0D80NhUhoD4YSRjDwHxw8jGGgLih4loPQTEDxPTagiIHyZq6CEgfpi4oYaA+KETux4C4ofO7GoIiB86te0QED907lySu9k8/rvLzwU691KS6zl8/N8lOTPKlQKDeT/Jl0n28//o95e/dnG0q6OcY2NfQFEnkryS5Pnlx78nuZnF6wUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/Uvk0X7SxWoGzoAAAAASUVORK5CYII="
                />
              </defs>
            </svg>
          </div>
          <div>Неограниченный доступ Адресата к вашим документам</div>
        </div>
        <div class="how-desc flex">
          <div class="how-desc__icon">
            <svg
              width="16"
              height="22"
              viewBox="0 0 16 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <mask
                id="mask0_330_756"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="22"
              >
                <rect
                  y="0.5"
                  width="16"
                  height="21.3333"
                  fill="url(#pattern3)"
                />
              </mask>
              <g mask="url(#mask0_330_756)">
                <rect y="0.5" width="16" height="21.3333" fill="#40C057" />
              </g>
              <defs>
                <pattern
                  id="pattern3"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlink:href="#image0_330_756"
                    transform="matrix(0.00520833 0 0 0.00390625 -0.166667 0)"
                  />
                </pattern>
                <image
                  id="image0_330_756"
                  width="256"
                  height="256"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAAdhAAAHYQGVw7i2AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABOdJREFUeJzt3LGPFGUcx+EvSiEYEqpLTCwUtUIbrbQwwQKJiIl/Aq2VWvg3UVhpNFhIYYiFRhtJLMDOGAM0hlzQCovdSxBZ9vZ255155/c8yYQccMxMeD+/d9g7NgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgpVNJLif5PMmtJPvL4+by5y4vfw8wI08n+STJnSQP1hy3k3y8/Bygc6eSfJH14T96XE1yeoTrBXZkL8mNbB7/wfFTkpPNrxrY2rbxHxxXWl84sJ29JL9k+/gPjvNtLx84ql3t/A8fPzS9A+BIdr3zP3y83PA+gA0NsfM/fHzU7lYO76mxLwAmYC/Jt0nODniOMwP+2Ud2fOwLgJHtJbmWYeM/OM/keAKgshY7/4G/GpxjY54AqKrVzn/gj0bnAdYY8tX+VcebTe4MeKKhX+1/3PFn/OcgGN0YO/+DJJ+2uDlgtTF2/gdZvFfAMw3uD1hhrJ3/XpJXG9wfsMJYO//9JO82uD9ghbF2/n+SXGpwf8AK4oeixA9FiR+KEj8UJX4oSvxQlPihKPFDUeKHosQPRYkfihI/FCV+KEr8UJT4oSjxQ1Hih6LED0WJH4oSPxQlfihK/FCU+KEo8UNR4oeixA9FiR+KEj8UJX4oSvxQlPihKPFDUeKHosQPRYkfihI/FCV+KEr8UJT4oSjxQ1Hih6LED0WJH4oSPxQlfihK/FCU+KEo8UNR4i/g2NgXsCPHk7yV5O0kzyU5neR2kltJvln+yOHtJbmW5Gzj8/6d5MMkVxufl06dTPJZkjt58q7yY5ILI11jb/aS3Ej7nf9+/B2xgdeS/JbNFtmVLIYGjyd+unAuyb0cbbH9nMVC57/ETxdezPpH/nXHr1m8VsCCF/zoxvfZzeK7EU8CiZ2fjnyQ3S7C6k8Cdn668nV2vxirDgHx05Vns3hsHGJRVvvngMd+uvNGhl2cVZ4E7Px06WKGX6RzHwLip1vvpc1inesQED9dez3tFu3choD46d6JJPsxBDYlfmbjq7RdxL0PAfEzK5fSfjH3OgTEzyxdT/tF3dv3Cfg6P7P1QhZv9uFJ4PHs/MzeOxnuuwJ7fhKw81PG+YwzBKb6JGDnpxxDYEH8lFV9CIif8qoOAfHDUrUhIH54RJUhIH5YYe5DQPywxlyHgPjhkOY2BMQPG5rLEBA/HFHvQ0D8sKVeh4D4YUd6GwLihx3rZQiIHwYy9SEgfhjYVIeA+KGRqQ0B8UNjUxkC4oeRjD0ExA8ju5Dx3mPQe/jBBIz1JGDnh4mY+xAQP6wx1yEgfjikuQ0B8cOG5jIExA9H1PsQED9sqdchIH7Ykd6GgPhhx3oZAuKHgUx9CIgfBjbVISB+aGRqQ0D80NhUhoD4YSRjDwHxw8jGGgLih4loPQTEDxPTagiIHyZq6CEgfpi4oYaA+KETux4C4ofO7GoIiB86te0QED907lySu9k8/rvLzwU691KS6zl8/N8lOTPKlQKDeT/Jl0n28//o95e/dnG0q6OcY2NfQFEnkryS5Pnlx78nuZnF6wUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/Uvk0X7SxWoGzoAAAAASUVORK5CYII="
                />
              </defs>
            </svg>
          </div>
          <div>Сохранение конфиденциальности важной информации</div>
        </div>
      </div>
    </div>
    <div style="position: relative; margin-top: 10px">
      <feedback />
      <ui-footer />
    </div>
    <!-- <div v-if="modal" class="modal">
      <div class="modal-overlay">
        <div class="modal-main">
          <div class="modal-main__action" @click="modal = false">
            <svg
              width="35"
              height="35"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              @click="modal = false"
            >
              <rect x="2" y="3" width="30" height="30" rx="15" fill="black" />
              <mask
                id="mask0_313_461"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="35"
                height="35"
              >
                <rect width="35" height="35" fill="url(#pattern0)" />
              </mask>
              <g mask="url(#mask0_313_461)">
                <rect width="35" height="35" fill="#E8E8E8" />
              </g>
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlink:href="#image0_313_461"
                    transform="scale(0.00195312)"
                  />
                </pattern>
                <image
                  id="image0_313_461"
                  width="512"
                  height="512"
                  xlink:href="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
          <div class="modal-main__content">
            Бесплатно 3 месяца
          </div>
          <div class="modal-main__button">
            OK
          </div>
        </div>
      </div>
    </div> -->
  </main>
</template>

<script>
import Feedback from "@/components/feedback.vue";
export default {
  componens: { Feedback },
  data() {
    return {
      document: null,
    };
  },
  async mounted() {
    try {
      this.document = (await this.$axios.get("/document")).data;
    } catch (error) {
      console.error(error);
      this.$toast.error(
        error?.response?.data?.message || "Произошла ошибка сервера"
      );
      this.$nuxt.error(error);
    }
  },
  computed: {
    formattedData() {
      // Преобразование Unix-времени в объект Date
      const dateObject = new Date(this.document?.activeAt);

      // Получение компонентов даты
      const year = dateObject.getFullYear();
      const month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
      const day = ("0" + dateObject.getDate()).slice(-2);

      const hours = ("0" + dateObject.getHours()).slice(-2);
      const minutes = ("0" + dateObject.getMinutes()).slice(-2);

      const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

      return formattedDate;
    },
  },
  methods: {
    async submit(tarif) {
      try {
        const document = (
          await this.$axios.post("/document/activate", { tarif })
        ).data;

        this.document = document;
        this.$toast.success("3 месяца бесплатно");
      } catch (error) {
        this.$toast.error(
          error?.response?.data?.message || "Произошла ошибка сервера"
        );
      }
    },
    copy() {
      if (!this.document.activate) {
        return;
      }
      const textElement = this.$refs.textElement;

      const textarea = document.createElement("textarea");
      textarea.value = textElement.innerText;

      // Добавляем его в DOM и выделяем текст
      document.body.appendChild(textarea);
      textarea.select();

      // Копируем текст в буфер обмена
      document.execCommand("copy");

      // Удаляем временный элемент textarea
      document.body.removeChild(textarea);

      // Визуальная обратная связь (может быть на ваше усмотрение)
      this.$toast.success("Ссылка скопирована");
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  box-sizing: border-box;

  .footer {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
  }

  .feedback {
    padding: 20px 20px 80px 20px;
  }
}
.info {
  display: flex;
  justify-content: space-between;

  &-input {
    margin-right: 15px;
    width: 100%;

    &.disabled {
      .info-input__title {
        color: #333;
        margin-bottom: 5px;
        font-weight: 600;
        font-size: 14px;
      }

      .info-input__link {
        background-color: #bbc2d1;
        font-weight: 500;
        line-height: 20px;
        padding: 15px 10px;
        border-radius: 10px;
        user-select: none;
      }
    }

    &__title {
      margin-bottom: 5px;
      font-weight: 600;
      font-size: 14px;
      color: #567bf3;
    }

    &__link {
      font-weight: 500;
      line-height: 20px;
      padding: 15px 10px;
      border: 1px solid #567bf3;
      border-radius: 10px;
      background: #f8fbff;
      overflow: hidden;
    }
  }

  &-action {
    margin-top: 30px;
  }
}

.how {
  margin-top: 20px;
  background-color: #f8fbff;
  padding: 20px;
  border-radius: 15px;

  &-title {
    color: #567bf3;
    line-height: 23px;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 10px;
  }

  &-desc {
    margin-top: 10px;

    .flex {
      display: flex;
      align-items: center;
    }

    &__head {
      font-weight: 600;
      margin-bottom: 5px;
    }

    &__icon {
      margin-right: 10px;
      widows: 20px;
      height: 20px;
    }

    line-height: 18px;
    font-size: 14px;
    font-weight: 500;
  }
}

.tarif {
  background-color: #567bf3;
  padding: 20px;
  border-radius: 15px;
  color: #fff;
  width: 100%;
  margin-bottom: 16px;

  &:last-child {
    margin-left: 10px;
    background-color: #ecf0f9;
    color: #567bf3;
  }

  &-title {
    line-height: 23px;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 10px;
  }

  &-price {
    margin-top: 10px;
    letter-spacing: 1px;

    &__price {
      font-weight: 700;
      font-size: 24px;
    }
    &__cur {
      font-size: 12px;
    }
  }

  &-desc {
    &:last-child {
      margin-top: 10px;
    }

    display: flex;
    align-items: center;

    &__icon {
      margin-right: 10px;
      widows: 20px;
      height: 20px;
    }

    line-height: 18px;
    font-size: 14px;
    font-weight: 500;
  }

  &-action {
    margin-top: 20px;
    text-align: center;
    font-size: 12px;
    position: relative;
    text-transform: uppercase;
    font-weight: 700;
    background-color: #fff;
    color: #567bf3;
    padding: 8px 3px;
    border-radius: 20px;
    letter-spacing: 0.6px;
    cursor: pointer;

    &.dop {
      background-color: #567bf3;
      color: #fff;
    }
    &__price {
      position: relative;
      font-weight: 600;
      letter-spacing: 1px;
    }

    &__cur {
      letter-spacing: 2px;
      font-size: 16px;
      font-weight: 600;
    }
  }

  &-btn {
    text-align: center;
    margin-top: 20px;

    a {
      text-decoration: none;
      color: #fff;
      text-align: center;
      margin-top: 15px;
      background-color: #40c057;
      padding: 10px 60px;
      border-radius: 30px;
      font-weight: 600;
    }
  }
}

.modal {
  &-overlay {
    background: #3337;
    bottom: 0;
    display: flex;
    left: 0;
    overflow-y: auto;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1000;
  }

  &-main {
    padding: 20px;
    background-color: #fff;
    margin: auto;
    width: 100%;
    border-radius: 30px;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    box-sizing: border-box;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 600px;

    &__action {
      text-align: right;
      margin-bottom: 20px;

      svg {
        cursor: pointer;
      }
    }
  }
}
</style>