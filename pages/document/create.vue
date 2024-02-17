<template>
  <div class="container">
    <div class="main">
      <div class="main-header" @click="$router.push('/')">INPFORSPHERE.COM</div>
      <div class="main-content">
        <div class="main-content_header">Создание документа</div>
        <div class="custom-file-input">
          <input
            type="file"
            id="fileInput"
            class="hidden"
            @change="handleFileChange"
          />
          <label for="fileInput" class="custom-button">
            <svg
              width="40"
              height="36"
              viewBox="0 0 40 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <mask
                id="mask0_243_3879"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="40"
                height="36"
              >
                <rect width="40" height="35.2113" fill="url(#pattern0)" />
              </mask>
              <g mask="url(#mask0_243_3879)">
                <rect width="40" height="35.2113" fill="#567BF3" />
              </g>
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlink:href="#image0_243_3879"
                    transform="matrix(0.00195312 0 0 0.00221875 0 -0.068)"
                  />
                </pattern>
                <image
                  id="image0_243_3879"
                  width="512"
                  height="512"
                  xlink:href="data:image/png;base64,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AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgMJjA/wfuDSU8OaBhnAAAAABJRU5ErkJggg=="
                />
              </defs>
            </svg>
            <div>Upload you document you want to share</div>
          </label>
        </div>
      </div>
      <div class="how">
        <div class="how-desc">
          <div>
            Если у вас нет готового документа, то загрузите любой документ, который вы сможете заменить позже в любой момент. Так мы сможем создать ссылку уже сейчас.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: "",
    };
  },
  methods: {
    async handleFileChange(e) {
      const file = e.target.files?.[0];

      const formData = new FormData();
      formData.append("pdf_file", file);

      try {
        const { link } = (await this.$axios.post("/document/create", formData))
          .data;

        this.$router.push({
          path: "/document/signup",
          query: { ...this.$route.query, link },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  &-header {
    color: #567bf3;
    font-size: 18px;
    line-height: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    cursor: pointer;
  }

  &-content {
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
    &_header {
      text-align: center;
      line-height: 27px;
      font-size: 20px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .custom-file-input {
      position: relative;
      overflow: hidden;
      display: block;
    }

    .custom-button {
      display: block;
      cursor: pointer;
      text-align: center;
      background-color: #f8fbff;
      padding: 30px;
      border-radius: 20px;
      svg {
        margin-bottom: 10px;
      }
      font-weight: 500;
      line-height: 17px;
    }

    .hidden {
      display: none;
    }

    .selected-file {
      display: block;
      margin-top: 8px;
    }
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
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: 500;

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
</style>